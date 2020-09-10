import { db } from "index";
import { DesignWork, DevelopmentWork } from "models";

export async function getDesignWorks(): Promise<DesignWork[]> {
  const snapshot = await db.collection("designWorks").get();
  return snapshot.docs.map(doc => doc.data() as DesignWork);
}

export async function getDevelopmentWorks(): Promise<DevelopmentWork[]> {
  const snapshot = await db.collection("developmentWorks").get();
  return snapshot.docs.map(doc => doc.data() as DevelopmentWork);
}
