import ErrorPage from "@/components/ErrorPage";
import siteInfo from "@/siteConfig";

export default function Error() {
  return (
    <ErrorPage
      title="Oops! Page not found"
      description="Our busy bee couldn't find what you'r looking for! Please try again."
      gif={siteInfo.errorGif}
    />
  );
}