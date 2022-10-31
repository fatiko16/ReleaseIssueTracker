// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
import { prismaStringMaxLength } from "../../../constants/dataverification";
export default async function handler(req, res) {
  const data = req.body;
  const { id: issueId, description: description } = data;

  if (description.length <= prismaStringMaxLength) {
    try {
      await prisma.issue.update({
        where: {
          id: issueId,
        },
        data: {
          name: description,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res
      .status(400)
      .json({
        message: "Issue description cannot be longer than 191 characters.",
      });
    return;
  }

  res.status(200).json({ name: "John Doe" });
}
