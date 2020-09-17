import * as firebase from "firebase";

export interface DesignWork {
  title: string;
  description: string;
  files: string[];
  thumbnail: string;
  timestamp: firebase.firestore.Timestamp;
}
