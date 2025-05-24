import BannerModel from "./bannerModel";
import GalleryModel from "./galleryModel";
import ImageAndTextModel from "./imageAndTextModel";

interface AcfPageResponseModel {
  success: boolean;
  pageId: number;
  acf: AcfContentModel;
}

interface AcfContentModel {
  banner: BannerModel;
  gallery: GalleryModel;
  imageAndText: ImageAndTextModel;
}

export default AcfPageResponseModel;
