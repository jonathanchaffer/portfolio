import firebase from "firebase/app";

export interface DesignWork {
  id: string;
  title: string;
  description: string;
  files: string[];
  thumbnail: string;
  timestamp: firebase.firestore.Timestamp;
}
