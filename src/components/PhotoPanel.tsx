import Image from "next/image";
import { couple, gallery, invitation } from "@/lib/wedding";

export const PhotoPanel = () => {
  const hero = gallery.welcome;

  return (
    <section className="relative h-[78vh] min-h-[520px] overflow-hidden bg-burgundy-deep lg:h-screen">
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        unoptimized
        priority
        sizes="(min-width: 1024px) 54vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/85 via-burgundy/20 to-burgundy-deep/10" />
      <div className="absolute inset-0 bg-burgundy-deep/20 mix-blend-multiply" />
      <div className="absolute inset-x-0 bottom-0 px-8 pb-10 text-ivory md:px-12 lg:pb-14">
        <p className="font-script text-[clamp(2.75rem,5.2vw,4.5rem)] leading-[0.95] drop-shadow-sm">
          {couple.groom.firstName}
        </p>
        <p className="font-script text-[clamp(2.75rem,5.2vw,4.5rem)] leading-[0.95] drop-shadow-sm">
          & {couple.bride.firstName}
        </p>
        <p className="mt-4 max-w-xl font-serif text-sm leading-relaxed text-ivory/90 md:text-base">
          {invitation.welcome}
        </p>
      </div>
    </section>
  );
};
