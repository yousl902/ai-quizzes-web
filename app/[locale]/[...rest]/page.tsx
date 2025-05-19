// this is how it is recommended to be done in the next-intl documentation
// https://next-intl.dev/docs/environments/error-files

import ErrorPage from "@/components/ErrorPage";
import assets from "@/configs/assets.json";
import { getTranslations } from "next-intl/server";

export default async function Error() {
  const t = await getTranslations("notFound");
  return (
    <ErrorPage
      title={t('title')}
      description={t('description')}
      gif={assets.errorGif}
    />
  );
}
