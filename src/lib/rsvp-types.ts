export type RsvpRecord = {
  id: string;
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: string;
  events: string[];
  meal: string;
  dietary: string;
  message: string;
  submittedAt: string;
};
