import { API_ROUTES, API_BASE } from "@/app/constants";
import NavItemModel from "@/app/models/navItemModel";

const fetchNavItemsBySlug = async (slug: string): Promise<NavItemModel[]> => {
  try {
    const response = await fetch(
      `${API_BASE}${API_ROUTES.GET_NAV_ROUTE}/${slug}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    throw new Error(message);
  }
};

const navService = { fetchNavItemsBySlug };

export default navService;
