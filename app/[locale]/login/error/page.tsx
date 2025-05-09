import ErrorPage from "@/components/ErrorPage";
import assests from "@/configs/assets.json";
import { getTranslations } from "next-intl/server";

export default async function Error() {
  const t = await getTranslations("loginFailed");

  return (
    <ErrorPage
      title={t('title')}
      description={t('description')}
      redirectTo="/login"
      gif={assests.errorGif}
    />
  );
}
