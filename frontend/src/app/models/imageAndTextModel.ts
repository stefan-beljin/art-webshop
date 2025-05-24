import ImageModel from "./shared/ImageModel";

interface ImageAndTextModel {
  id: string;
  title: string;
  text: string;
  image: ImageModel;
}

export default ImageAndTextModel;
