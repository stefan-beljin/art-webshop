import BannerModel from "./bannerModel";
import GalleryModel from "./galleryModel";

interface AcfPageResponseModel {
  success: boolean;
  pageId: number;
  acf: AcfContentModel;
}

interface AcfContentModel {
  banner: BannerModel;
  gallery: GalleryModel;
}

export default AcfPageResponseModel;
