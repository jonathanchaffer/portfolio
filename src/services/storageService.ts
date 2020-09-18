import { storageRef } from "index";
import { DesignWork, DevelopmentWork } from "models";

async function getFileURL(filename: string): Promise<string | undefined> {
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
