import pagesService from "../services/pagesService";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const data = await pagesService.fetchPageBySlug(slug);

  if (data.length === 0) {
    notFound();
  }

  return <div>{JSON.stringify(data)}</div>;
}
