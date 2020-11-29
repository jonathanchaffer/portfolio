import { EditDevelopmentWorkValues } from "components";
import { db } from "index";
import { DesignWork, DevelopmentWork } from "models";
import { uploadFile } from "./storageService";

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

/** Creates or updates a development work. If id is undefined, a new development work is created. */
export async function publishDevelopmentWork(
  id: string,
  work: EditDevelopmentWorkValues,
): Promise<void> {
  const isNew = !id;

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

  // Upload a new file if needed
  const newThumbnail = work.uploadedFile;
  if (newThumbnail !== undefined) {
    await uploadFile(newThumbnail);
  }

  // Update an existing document
  if (!isNew) {
    return db.doc(`developmentWorks/${id}`).update(newWork);
  }

  // Create a new document
  const snapshot = await db.collection("developmentWorks").add(newWork);
  const newId = snapshot.id;
  return db.doc(`developmentWorks/${newId}`).update({ id: newId });
}

export async function deleteDevelopmentWork(work: DevelopmentWork): Promise<void> {
  return db.doc(`developmentWorks/${work.id}`).delete();
}
