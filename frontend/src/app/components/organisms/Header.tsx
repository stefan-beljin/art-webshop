import Navigation from "../molecules/Navigation";
import navService from "@/app/services/navService";
import { menuSlug } from "@/app/constants";

export default async function Header() {
  const navItems = await navService.fetchNavItemsBySlug(menuSlug);

  return (
    <header className="grid items-center lg:fixed top-0 left-0 lg:h-screen lg:w-1/5 bg-white">
      <Navigation navigationType="main" navItems={navItems} />
    </header>
  );
}
