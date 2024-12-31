import { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/app/lib/tailwind-util";

export const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      type="button"
      className={cn("bg-blue-500 rounded-lg p-2", className)}
      {...props}
    >
      {children}
    </button>
  );
};
