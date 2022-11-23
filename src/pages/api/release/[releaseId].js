import prisma from "../../../db/client";
export default async function handler(req, res) {
  const { releaseId } = req.query;
  let releaseData;
  try {
    releaseData = await prisma.release.findUnique({
      select: {
        id: true,
        name: true,
        issues: {
          select: {
            id: true,
            name: true,
            comments: true,
            isResolved: true,
            releaseId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        pausedTCs: {
          select: {
            id: true,
            reason: true,
            pauseComments: true,
            releaseId: true,
            TCId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      where: {
        id: parseInt(releaseId),
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ release: releaseData });
}
