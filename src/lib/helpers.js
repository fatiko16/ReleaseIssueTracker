import prisma from "../db/client";

export async function getAllReleases() {
  let allReleases;
  try {
    allReleases = await prisma.release.findMany({
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
  if (allReleases === undefined) {
    allReleases = null;
  }

  allReleases.forEach((release) => {
    release.issues.map((issue) => {
      issue.updatedAt = Math.floor(issue.updatedAt / 1000);
      issue.createdAt = Math.floor(issue.createdAt / 1000);
      return issue;
    });
  });

  allReleases.forEach((release) => {
    release.pausedTCs.map((pausedTC) => {
      pausedTC.updatedAt = Math.floor(pausedTC.updatedAt / 1000);
      pausedTC.createdAt = Math.floor(pausedTC.createdAt / 1000);
      return pausedTC;
    });
  });

  return allReleases;
}
