export interface Document {
  id: string;
  name: string;
  status: "Pending" | "Signed" | "Declined";
}

export interface FormValues {
  emails: { email: string }[];
}
