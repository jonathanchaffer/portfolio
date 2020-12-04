import firebase from "firebase/app";

export interface DesignWork {
  id: string;
  title: string;
  files: string[];
  timestamp: firebase.firestore.Timestamp;
  thumbnail?: string;
}
