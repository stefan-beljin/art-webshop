import Image from "next/image";
import ImageModel from "@/app/models/shared/ImageModel";

interface ImageAtomProps {
  image: ImageModel;
  className?: string;
  priority?: boolean;
}

export default function ImageAtom({
  image,
  className,
  priority,
}: ImageAtomProps) {
  const { url, width, height, alt } = image;
  return (
    <Image
      src={url}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
    />
  );
}
