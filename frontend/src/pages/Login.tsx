
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store.auth";

const loginSchema = z.object({
  identifier: z.string().min(1, "Enter email or mobile").max(100),
  password: z.string().min(4, "Enter password/OTP").max(100),
  remember: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  const onSubmit = async (values: LoginValues) => {
    try {
      // 🔹 Step 1: send login to backend
      const res = await fetch("http://localhost:4004/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: values.identifier.includes("@") ? values.identifier : undefined,
          username: values.identifier.includes("@") ? undefined : values.identifier,
          password: values.password 
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // 🔹 Step 2: store token
      localStorage.setItem("maha_token", data.token);

      // 🔹 Step 3: fetch profile
      // const profileRes = await fetch("http://localhost:4004/api/profile", {
      //   headers: { Authorization: `Bearer ${data.token}` },
      // });
      // const profileJSON = await profileRes.json();
      // if (!profileRes.ok) {
      //   alert(profileJSON.error || "Failed to fetch profile");
      //   return;
      // }

      // // 🔹 Step 4: update Zustand store
      // login(profileJSON.user, data.token);

      // 🔹 Step 5: redirect
      navigate("/dashboard");
    } catch (err) {
      console.error("login error:", err);
      alert("Network error");
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Welcome to MahaDBT</CardTitle>
            <CardDescription>
              Login with your mobile or email to continue your scholarship application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="identifier">Email or Mobile</Label>
                <Input
                  id="identifier"
                  placeholder="e.g. 9876543210 or you@example.com"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="mt-1 text-xs text-destructive">{errors.identifier.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password / OTP</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
              <div className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our Terms & Privacy Policy.
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Magic link sent (mock). Check WhatsApp/SMS!")}
            >
              Get OTP via WhatsApp/SMS
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => alert("Use your DISE/Institute login (coming soon)")}
            >
              Institute Login
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="order-1 md:order-2">
        <div className="mx-auto max-w-lg rounded-3xl border bg-card p-8 shadow-sm">
        </div>
      </div>
    </div>
  );
}
