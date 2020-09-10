import * as firebase from "firebase";

export interface DesignWork {
  title: string;
  description: string;
  files: string[];
  timestamp: firebase.firestore.Timestamp;
}
