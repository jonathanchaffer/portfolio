import { storageRef } from "index";
import { DesignWork, DevelopmentWork } from "models";

export async function getDevelopmentThumbnailURL(
  work: DevelopmentWork,
): Promise<string | undefined> {
  return work.thumbnail
    ? storageRef.child(`development/${work.thumbnail}`).getDownloadURL()
    : undefined;
}

export async function getFirstDesignFileURL(work: DesignWork): Promise<string | undefined> {
  return work.files ? storageRef.child(`design/${work.files[0]}`).getDownloadURL() : undefined;
}
