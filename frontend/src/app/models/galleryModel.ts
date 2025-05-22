import ImageModel from "./shared/ImageModel";

interface GalleryModel {
  id?: string;
  title: string;
  backgroundImage: ImageModel;
  items: GalleryItemModel[];
}

interface GalleryItemModel {
  image: ImageModel;
}

export default GalleryModel;
