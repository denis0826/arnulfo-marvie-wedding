import { GuestSite } from "@/components/GuestSite";
import { SiteGate } from "@/components/SiteGate";
import { isSiteSession } from "@/lib/site-auth";

export default async function Home() {
  if (await isSiteSession()) {
    return <GuestSite />;
  }

  return <SiteGate />;
}
