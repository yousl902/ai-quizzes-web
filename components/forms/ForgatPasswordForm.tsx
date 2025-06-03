import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/app/actions/auth";
import { AuthButton } from "@/components/AuthButton";
import { getTranslations } from "next-intl/server";


export default async function ForgotPasswordForm() {
  const t = await getTranslations("forgotPassword");

  return (
    <Card className="max-w-md w-full shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-center">
          {t("description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <AuthButton
            action={resetPassword}
            text={t("sendResetLink")}
            loadingText={t("loading")}
            successMessage={t("emailSent")}
            className="w-full text-white bg-btn-reset-password hover:bg-btn-reset-password/90"
          />

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm hover:underline transition-colors"
            >
              {t("backToLogin")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
