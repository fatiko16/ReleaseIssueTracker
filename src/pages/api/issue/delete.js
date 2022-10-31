import prisma from "../../../db/client";
export default async function handler(req, res) {
  const data = req.body;
  const { id: issueId } = data;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        issueId: issueId,
      },
    });
    if (comments.length === 0) {
      await prisma.issue.delete({
        where: {
          id: issueId,
        },
      });
    } else {
      res.status(400).json({
        message:
          "Cannot delete an issue with existing comments. Delete the comments first then delete the issue.",
      });
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
  res.status(200).json({ name: "John Doe" });
}
