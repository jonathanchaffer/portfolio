import { storageRef } from "index";
import { DevelopmentWork } from "models";

export async function getDevelopmentThumbnailURL(
  work: DevelopmentWork,
): Promise<string | undefined> {
  return work.thumbnail
    ? storageRef.child(`development/${work.thumbnail}`).getDownloadURL()
    : undefined;
}
