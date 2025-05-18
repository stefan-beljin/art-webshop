import { API_ROUTES, API_BASE } from "@/app/constants";
import { get } from "../utils";
import NavItemModel from "@/app/models/navItemModel";

const fetchNavItemsBySlug = async (slug: string) =>
  get<NavItemModel[]>(`${API_BASE}${API_ROUTES.GET_NAV_ROUTE}/${slug}`);

const navService = { fetchNavItemsBySlug };

export default navService;
