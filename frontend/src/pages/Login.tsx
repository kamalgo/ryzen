// Login.tsx
// 🔹 Handles login flow for MahaDBT application
// - Collects username & password
// - Sends login request to backend
// - Stores JWT if login successful
// - Redirects to Gallabox (WhatsApp bot) link with token

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/Card";
import { useAuth } from "@/store.auth";

// ✅ API Base URL is read from .env file
const API_BASE = (import.meta as any).env.VITE_BACKEND_ENDPOINT;

/**
 * 🔹 Validation schema for login form
 * - username: required
 * - password: required
 * - phoneNumber: required (new)
 */
const loginSchema = z.object({
  identifier: z.string().min(1, "Enter your username").max(100),
  password: z.string().min(4, "Enter password/OTP").max(100),
  phoneNumber: z
    .string()
    .min(10, "Enter valid phone number")
    .max(15, "Phone number too long"),
  remember: z.boolean().optional(),
});

// Type for form values derived from schema
type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", phoneNumber: "" },
  });

  // Zustand store function for saving auth state
  const login = useAuth((s) => s.login);

  /**
   * 🔹 onSubmit handler
   * - Sends login data to backend
   * - Validates response
   * - Stores JWT token (optional for PWA)
   * - Redirects to Gallabox WA bot (clean link)
   */
  const onSubmit = async (values: LoginValues) => {
    try {
      // Step 1: Send login request
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.identifier,
          password: values.password,
          phoneNumber: values.phoneNumber, // ✅ now required
        }),
      });

      const data = await res.json();

      // Step 2: Handle errors
      if (!res.ok || !data.success) {
        alert(data.error || "Login failed");
        return;
      }

      // Step 3: Store token locally (optional)
      if (data.token) {
        localStorage.setItem("maha_token", data.token);
        login({ username: values.identifier }, data.token);
      }

      // Step 4: Redirect to Gallabox WA bot (clean link, no sessionId)
      if (data.redirectWa) {
        window.location.href = data.redirectWa;
      } else {
        alert("Login successful, but no WhatsApp link returned.");
      }
    } catch (err) {
      console.error("login error:", err);
      alert("Network error");
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
      {/* Login Form Section */}
      <div className="order-2 md:order-1">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Welcome to MahaDBT</CardTitle>
            <CardDescription>
              Login with your username and phone number to continue your
              scholarship application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Field */}
              <div>
                <Label htmlFor="identifier">Username</Label>
                <Input
                  id="identifier"
                  placeholder="Enter your username"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password">Password / OTP</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Phone Field (NEW) */}
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91XXXXXXXXXX"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our Terms & Privacy Policy.
              </div>
            </form>
          </CardContent>

          {/* Footer Actions */}
          <CardFooter className="justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                alert("Magic link sent (mock). Check WhatsApp/SMS!")
              }
            >
              Get OTP via WhatsApp/SMS
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                alert("Use your DISE/Institute login (coming soon)")
              }
            >
              Institute Login
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Right Side Illustration / Branding */}
      <div className="order-1 md:order-2">
        <div className="mx-auto max-w-lg rounded-3xl border bg-card p-8 shadow-sm"></div>
      </div>
    </div>
  );
}
