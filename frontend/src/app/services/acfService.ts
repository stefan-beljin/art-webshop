import { API_ROUTES, API_BASE } from "@/app/constants";
import { get } from "@/app/utils";

import FooterModel from "../models/footerModel";

const fetchOptionsByGroupName = async (name: string) =>
  get<FooterModel>(
    `${API_BASE}${API_ROUTES.GET_OPTIONS_GROUP.replace("{name}", name)}`
  );

const acfService = { fetchOptionsByGroupName };

export default acfService;
