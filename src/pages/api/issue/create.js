// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
import { prismaStringMaxLength } from "../../../constants/dataverification";
export default async function handler(req, res) {
  const data = req.body;
  const { releaseId: releaseId, name: newIssueName } = data;
  if (newIssueName.length <= prismaStringMaxLength) {
    try {
      await prisma.issue.create({
        data: {
          name: newIssueName,
          release: {
            connect: {
              id: releaseId,
            },
          },
          isResolved: false,
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
