import { EditDevelopmentWorkValues } from "components";
import { db } from "index";
import { DesignWork, DevelopmentWork } from "models";
import { deleteFile, uploadFile } from "./storageService";

export async function getDesignWorks(): Promise<DesignWork[]> {
  const snapshot = await db.collection("designWorks").orderBy("timestamp", "desc").get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as DesignWork;
  });
}

export async function getDevelopmentWorks(): Promise<DevelopmentWork[]> {
  const snapshot = await db.collection("developmentWorks").orderBy("timestamp", "desc").get();
  return snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id } as DevelopmentWork;
  });
}

export async function updateDevelopmentWork(
  id: string,
  work: EditDevelopmentWorkValues,
): Promise<void> {
  /* The work param is passed in as EditDevelopmentWorkValues, which has an uploadedFile
   * field used when we need to upload a new thumbnail. But uploadedFile should not be added
   * to the document, so we first convert it to a regular DevelopmentWork. */
  const newWork: DevelopmentWork = {
    description: work.description,
    id: work.id,
    links: work.links,
    thumbnail: work.thumbnail,
    timestamp: work.timestamp,
    title: work.title,
  };

  const newThumbnail = work.uploadedFile;
  if (newThumbnail !== undefined) {
    const snapshot = await uploadFile(newThumbnail);
    newWork.thumbnail = snapshot.ref.name;
    await deleteFile(work.thumbnail);
  }

  return db.doc(`developmentWorks/${id}`).update(newWork);
}
