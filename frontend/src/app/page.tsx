import acfService from "./services/acfService";
import Hero from "./components/organisms/Hero";
import Gallery from "./components/organisms/Gallery";
import ImageAndText from "./components/organisms/ImageAndText";

export default async function Home() {
  const data = await acfService.fetchPageAcfBySlug("homepage");

  if (!data) return;

  const { acf } = data;

  return (
    <div className="h-full">
      <Hero data={acf.banner} />
      <ImageAndText data={acf.imageAndText} />
      <Gallery data={acf.gallery} />
    </div>
  );
}
