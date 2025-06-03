"use client";

import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthActionResponse, ServerActionState } from "@/app/actions/auth";

type ServerAction = (
  state: ServerActionState,
  formData: FormData
) => Promise<AuthActionResponse>;

interface AuthButtonProps {
  action: ServerAction;
  text: string;
  loadingText?: string;
  successMessage?: string;
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export function AuthButton({
  action,
  text,
  loadingText,
  successMessage,
  icon: Icon,
  className,
  disabled,
}: AuthButtonProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    if (!state.success && state.message) {
      toast.error(state.message);
    } else if (state.success && successMessage) {
      toast.success(successMessage);
    }
  }, [state, successMessage]);

  const renderIcon = () => {
    if (isPending) {
      return <Loader className="mr-2 h-4 w-4 animate-spin" />;
    }
    if (Icon) {
      return <Icon className="mr-2 h-4 w-4" />;
    }
    return null;
  };

  return (
    <Button
      formAction={formAction}
      type="submit"
      disabled={isPending || disabled}
      className={cn(
        "transition-all duration-200",
        isPending && "cursor-not-allowed opacity-75",
        className
      )}
    >
      {renderIcon()}
      {isPending && loadingText ? loadingText : text}
    </Button>
  );
}
