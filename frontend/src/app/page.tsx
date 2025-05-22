import acfService from "./services/acfService";
import Hero from "./components/organisms/Hero";
import Gallery from "./components/organisms/Gallery";

export default async function Home() {
  const data = await acfService.fetchPageAcfBySlug("homepage");

  return (
    <div className="h-full">
      <Hero data={data.acf.banner} />
      <Gallery data={data.acf.gallery} />
    </div>
  );
}
