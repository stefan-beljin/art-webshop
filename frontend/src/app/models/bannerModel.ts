import ImageModel from "./shared/ImageModel";

interface BannerModel {
  id?: string;
  title: string;
  firstStripedImage: ImageModel;
  secondStripedImage: ImageModel;
  thirdStripedImage: ImageModel;
}

export default BannerModel;
