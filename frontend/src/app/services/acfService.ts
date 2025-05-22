import { API_ROUTES, API_BASE } from "@/app/constants";
import { get } from "@/app/utils";

import FooterModel from "../models/footerModel";
import AcfPageResponseModel from "../models/AcfPageResponseModel";

const fetchOptionsByGroupName = async (name: string) =>
  get<FooterModel>(
    `${API_BASE}${API_ROUTES.GET_OPTIONS_GROUP.replace("{name}", name)}`
  );

const fetchPageAcfBySlug = async (slug: string) =>
  get<AcfPageResponseModel>(
    `${API_BASE}${API_ROUTES.GET_ACF_ON_PAGE.replace("{slug}", slug)}`
  );

const acfService = { fetchOptionsByGroupName, fetchPageAcfBySlug };

export default acfService;
