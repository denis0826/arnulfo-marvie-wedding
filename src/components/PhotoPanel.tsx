import Image from "next/image";
import { couple, gallery, invitation } from "@/lib/wedding";

type PhotoPanelProps = {
  sectionId: string;
};

export const PhotoPanel = ({ sectionId }: PhotoPanelProps) => {
  const activeId = gallery[sectionId] ? sectionId : "welcome";

  return (
    <section className="relative h-[78vh] min-h-[520px] overflow-hidden bg-burgundy-deep lg:h-screen">
      {Object.entries(gallery).map(([id, image]) => (
        <Image
          key={id}
          src={image.src}
          alt={image.alt}
          fill
          unoptimized
          priority={id === "welcome"}
          sizes="(min-width: 1024px) 54vw, 100vw"
          className={`object-cover transition-opacity duration-700 ease-out ${
            id === activeId
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/80 via-burgundy-deep/15 to-transparent" />
      <div className="absolute inset-0 bg-olive-deep/10 mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-ivory md:px-12 lg:pb-14">
        <p className="font-script text-5xl leading-none drop-shadow-sm md:text-6xl lg:text-7xl">
          {couple.displayNames}
        </p>
        <p className="mt-4 max-w-xl font-serif text-sm leading-relaxed text-ivory/90 md:text-base">
          {invitation.welcome}
        </p>
      </div>
    </section>
  );
};
