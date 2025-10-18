import ImageModel from "./shared/ImageModel";

export default interface FormModel {
  id?: string;
  title: string;
  image?: ImageModel;
}
