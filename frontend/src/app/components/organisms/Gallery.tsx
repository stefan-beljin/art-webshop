"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageAtom from "../atoms/Image";
import GalleryModel from "@/app/models/galleryModel";

interface GalleryProps {
  data: GalleryModel;
}

export default function Gallery({ data }: GalleryProps) {
  const { id, backgroundImage, items } = data;
  return (
    <section id={id} className="relative py-16 p-8 sm:px-15">
      <h2 className="text-center text-[36px] relative z-1 mb-[40px]">
        Galerija
      </h2>
      <ImageAtom
        image={backgroundImage}
        className="absolute z-[0] top-[0] left-[0] object-cover h-full w-full"
      />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter={"2vw"}>
          {items.map((item) => {
            return (
              <div key={item.image.id} className="frame relative z-2">
                <ImageAtom image={item.image} />
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
