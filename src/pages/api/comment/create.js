// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prismaStringMaxLength } from "../../../constants/dataverification";
import prisma from "../../../db/client";
export default async function handler(req, res) {
  const data = req.body;
  const { issueId: issueId, description: description } = data;
  if (description.length <= prismaStringMaxLength) {
    try {
      await prisma.comment.create({
        data: {
          description: description,
          issue: {
            connect: {
              id: issueId,
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
      .json({ message: "Issue comment cannot be longer than 191 characters." });
    return;
  }

  res.status(200).json({ name: "John Doe" });
}
