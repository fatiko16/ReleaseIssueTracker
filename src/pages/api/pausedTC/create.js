// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
import { prismaStringMaxLength } from "../../../constants/dataverification";
export default async function handler(req, res) {
  const data = req.body;
  const { reason: reason, tfsId: tfsId, releaseId: releaseId } = data;
  if (reason.length <= prismaStringMaxLength) {
    try {
      await prisma.pausedTC.create({
        data: {
          reason: data.reason,
          TCId: parseInt(tfsId),
          release: {
            connect: {
              id: releaseId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    //I can add error type here, it is better to use constant for the task for consistency
    res
      .status(400)
      .json({ message: "Issue name cannot be longer than 191 characters." });
    return;
  }
  res.status(200).json({ name: "John Doe" });
}
