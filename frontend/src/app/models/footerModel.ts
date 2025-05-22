import ImageModel from "./shared/ImageModel";

export interface Social {
  icon: ImageModel;
  socialUrl: string;
}

export interface FooterModel {
  footerTitle: string;
  address: string;
  email: string;
  copyright: string;
  socials: Social[];
}
export default FooterModel;
