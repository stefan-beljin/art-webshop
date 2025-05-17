import Navigation from "../molecules/Navigation";
import navService from "@/app/services/navService";
import { menuSlug } from "@/app/constants";

export default async function Header() {
  const navItems = await navService.fetchNavItemsBySlug(menuSlug);

  return (
    <header className="grid items-center fixed p-[3%] top-0 left-0 h-screen w-1/5 font-[family-name:var(--font-geist-sans)] bg-white">
      <Navigation navigationType="main" navItems={navItems} />
    </header>
  );
}
