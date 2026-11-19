import { SectionHeading } from "@/components/Flourish";
import { entourage } from "@/lib/wedding";

type NameGroup = {
  title: string;
  names: string[];
};

const NameList = ({ names }: { names: string[] }) => {
  return (
    <ul className="mt-3 space-y-1.5">
      {names.map((name) => (
        <li
          key={name}
          className="font-serif text-[1.05rem] leading-snug break-words text-ink"
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

const GroupCard = ({
  group,
  align = "center",
}: {
  group: NameGroup;
  align?: "center" | "left";
}) => {
  return (
    <article
      className={`min-w-0 rounded-2xl border border-burgundy/15 bg-ivory-soft p-5 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <h3 className="font-display text-[11px] tracking-[0.28em] text-burgundy uppercase">
        {group.title}
      </h3>
      <NameList names={group.names} />
    </article>
  );
};

const GroupGrid = ({
  groups,
  columns,
}: {
  groups: NameGroup[];
  columns: "two" | "three";
}) => {
  return (
    <div
      className={`mt-4 grid gap-4 ${
        columns === "three" ? "sm:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {groups.map((group) => (
        <GroupCard key={group.title} group={group} />
      ))}
    </div>
  );
};

export const EntourageSection = () => {
  return (
    <section id="entourage" className="px-6 py-20 md:px-10">
      <SectionHeading>Entourage</SectionHeading>
      <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        {entourage.note}
      </p>

      <div className="mt-12">
        <GroupGrid groups={entourage.parents} columns="two" />
      </div>

      <div className="mt-12">
        <h3 className="text-center font-display text-[11px] tracking-[0.28em] text-burgundy uppercase">
          {entourage.principalSponsors.title}
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {entourage.principalSponsors.columns.map((column) => (
            <GroupCard key={column.title} group={column} align="left" />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <GroupGrid groups={entourage.honorAttendants} columns="two" />
      </div>

      <div className="mt-12">
        <GroupGrid groups={entourage.weddingParty} columns="two" />
      </div>

      <div className="mt-12">
        <GroupGrid
          groups={entourage.attendants.slice(0, 2)}
          columns="two"
        />
        <div className="mt-4">
          <GroupCard group={entourage.attendants[2]} />
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-center font-display text-[11px] tracking-[0.28em] text-burgundy uppercase">
          Secondary Sponsors
        </h3>
        <GroupGrid groups={entourage.secondarySponsors} columns="three" />
      </div>

      <div className="mt-12">
        <GroupGrid groups={entourage.bearers} columns="three" />
      </div>

      <div className="mt-12">
        <GroupCard group={entourage.flowerGirls} />
      </div>
    </section>
  );
};
