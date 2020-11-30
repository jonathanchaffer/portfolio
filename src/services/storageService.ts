import * as firebase from "firebase";
import { storageRef } from "index";
import { DesignWork, DevelopmentWork } from "models";

export async function getFileURL(filename: string): Promise<string | undefined> {
  if (!filename) return undefined;
  return storageRef.child(filename).getDownloadURL() || undefined;
}

export async function getDevelopmentThumbnailURL(
  work: DevelopmentWork,
): Promise<string | undefined> {
  return getFileURL(work.thumbnail);
}

export async function getDesignThumbnailURL(work: DesignWork): Promise<string | undefined> {
  if (work.thumbnail) return getFileURL(work.thumbnail);
  return getFileURL(work.files[0]);
}

export async function uploadFile(file: File): Promise<firebase.storage.UploadTaskSnapshot> {
  return storageRef.child(file.name).put(file);
}

export async function deleteFile(filename: string): Promise<void> {
  return storageRef.child(filename).delete();
}
