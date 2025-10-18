import acfService from "../services/acfService";
import { notFound } from "next/navigation";
import Hero from "../components/organisms/Hero";

export default async function Page({}: { params: Promise<{ slug: string }> }) {
  const data = await acfService.fetchPageAcfBySlug("sample-page");

  if (!data) {
    notFound();
  }

  const { acf } = data;

  return (
    <div className="h-full">{acf?.banner && <Hero data={acf.banner} />}</div>
  );
}
