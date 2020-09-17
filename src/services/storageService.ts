import { storageRef } from "index";
import { DesignWork, DevelopmentWork } from "models";

export async function getDevelopmentThumbnailURL(
  work: DevelopmentWork,
): Promise<string | undefined> {
  return work.thumbnail
    ? storageRef.child(`development/${work.thumbnail}`).getDownloadURL()
    : undefined;
}

export async function getDesignThumbnailURL(work: DesignWork): Promise<string | undefined> {
  if (work.thumbnail)
    return storageRef.child(`design/${work.thumbnail}`).getDownloadURL() || undefined;
  return storageRef.child(`design/${work.files[0]}`).getDownloadURL() || undefined;
}
