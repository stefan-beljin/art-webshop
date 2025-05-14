import pagesService from "./services/pagesService";

export default async function Home() {
  const data = await pagesService.fetchPages();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {JSON.stringify(data)}
    </div>
  );
}
