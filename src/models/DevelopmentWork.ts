import firebase from "firebase/app";

export type LinkType = "github" | "appStore" | "website";
export interface DevelopmentWork {
  id: string;
  title: string;
  description: string;
  links: Record<LinkType, string>;
  timestamp: firebase.firestore.Timestamp;
  thumbnail: string;
}
