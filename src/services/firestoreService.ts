import { db } from "index";
import { DesignWork, DevelopmentWork } from "models";

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

export async function updateDevelopmentWork(id: string, work: DevelopmentWork): Promise<void> {
  return db.doc(`developmentWorks/${id}`).update(work);
}
