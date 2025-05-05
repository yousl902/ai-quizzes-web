import ErrorPage from "@/components/ErrorPage";
import siteInfo from "@/siteConfig";

export default function Error() {
  return (
    <ErrorPage
      title="Oops! Login Failed"
      description="Our busy bee couldn't verify your credentials! Please try again."
      redirectTo="/login"
      gif={siteInfo.errorGif}
    />
  );
}