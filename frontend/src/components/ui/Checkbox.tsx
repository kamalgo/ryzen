import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn("h-4 w-4 rounded border-input text-sky-600 focus:ring-ring", props.className)}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";
