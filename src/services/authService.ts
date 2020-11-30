import * as firebase from "firebase";
import { auth } from "index";

export function login(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout(): Promise<void> {
  return auth.signOut();
}
