export interface MediaSizes {
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  medium: string;
  mediumWidth: number;
  mediumHeight: number;
  mediumLarge: string;
  mediumLargeWidth: number;
  mediumLargeHeight: number;
  large: string;
  largeWidth: number;
  largeHeight: number;
  size1536x1536: string;
  size1536x1536Width: number;
  size1536x1536Height: number;
  size2048x2048: string;
  size2048x2048Width: number;
  size2048x2048Height: number;
}

export interface ImageModel {
  id: number;
  legacyId: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploadedTo: number;
  date: string;
  modified: string;
  menuOrder: number;
  mimeType: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: MediaSizes;
}

export default ImageModel;
