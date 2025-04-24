import ErrorPage from "@/components/ErrorPage";
import siteInfo from "@/siteConfig";

export default function Error() {
  return (
    <ErrorPage
      title="Oops! Something went wrong"
      description="Our busy bee couldn't create your account! Please try again."
      redirectTo="/signup"
      gif={siteInfo.errorGif}
    />
  );
}