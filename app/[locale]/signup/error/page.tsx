import ErrorPage from "@/components/ErrorPage";
import assets from "@/configs/assets.json";
import { getTranslations } from "next-intl/server";

export default async function Error() {
  const t = await getTranslations("signupFailed");
  return (
    <ErrorPage
      title={t('title')}
      description={t('description')}
      redirectTo="/signup"
      gif={assets.errorGif}
    />
  );
}
