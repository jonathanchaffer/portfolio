import * as firebase from "firebase";

export interface DevelopmentWork {
  title: string;
  description: string;
  links: Map<string, string>;
  timestamp: firebase.firestore.Timestamp;
}
