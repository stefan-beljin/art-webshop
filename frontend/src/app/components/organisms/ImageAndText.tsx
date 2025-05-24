import ImageAtom from "../atoms/Image";
import ImageAndTextModel from "@/app/models/imageAndTextModel";

interface ImageAndTextProps {
  data: ImageAndTextModel;
}

export default function ImageAndText({ data }: ImageAndTextProps) {
  if (!data) return;

  const { id, title, text, image } = data;

  return (
    <section
      id={id}
      className="lg:flex lg:gap-[40px] lg:items-center lg:h-screen relative py-16 p-8 sm:px-15 bg-white text-black"
    >
      <div className="lg:max-w-[45%] basis-1/2">
        {title && (
          <h2 className="text-[36px] lg:text-[64px] relative z-1 mb-[40px]">
            {title}
          </h2>
        )}
        {text && (
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-[18px] lg:text-[24px] relative z-1 mb-[40px]"
          />
        )}
      </div>
      {image && (
        <div className="lg:max-w-[35%] basis-1/2">
          <ImageAtom image={image} />
        </div>
      )}
    </section>
  );
}
