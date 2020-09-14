import * as firebase from "firebase";

export type LinkType = "github" | "appStore";
export interface DevelopmentWork {
  title: string;
  description: string;
  links: Record<LinkType, string>;
  timestamp: firebase.firestore.Timestamp;
  thumbnail: string;
}
