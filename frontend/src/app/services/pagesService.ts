import { API_ROUTES, API_BASE } from "@/app/constants";

const fetchPages = async () => {
  try {
    const response = await fetch(`${API_BASE}${API_ROUTES.GET_PAGES_ROUTE}`);
    const data = await response.json();
    return data;
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    throw new Error(message);
  }
};

const fetchPageBySlug = async (slug: string) => {
  try {
    const response = await fetch(
      `${API_BASE}${API_ROUTES.GET_PAGES_ROUTE}?slug=${slug}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    throw new Error(message);
  }
};

const pagesService = { fetchPageBySlug, fetchPages };

export default pagesService;
