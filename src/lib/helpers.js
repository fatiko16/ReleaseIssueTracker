import prisma from "../db/client";
import domain from "../constants/domain";

//Better to change name for clarification
export async function getAllReleases() {
  let allReleases;
  try {
    allReleases = await prisma.release.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
  if (allReleases === undefined) {
    allReleases = null;
  }

  return allReleases;
}

export async function getRelease(releaseId) {
  let release;
  try {
    release = await prisma.release.findUnique({
      select: {
        id: true,
        name: true,
        issues: true,
        pausedTCs: true,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return release;
}
