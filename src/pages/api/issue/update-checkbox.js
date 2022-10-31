// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
export default async function handler(req, res) {
  const data = req.body;
  const { id: issueId, isResolved: isResolved } = data;

  try {
    await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        isResolved: isResolved,
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ name: "John Doe" });
}
