import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/constants/ui";
import { Button } from "@/components/atoms/button";

interface LinkButtonProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

function LinkButton({
  variant = "outline",
  size = "sm",
  target,
  children,
  ...props
}: LinkButtonProps) {
  const isExternal = target === "_blank";
  const safeRel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <Button variant={variant} size={size} asChild>
      <a target={target} rel={safeRel} {...props}>
        {children}
      </a>
    </Button>
  );
}

LinkButton.displayName = "LinkButton";

export { LinkButton };
export type { LinkButtonProps };
