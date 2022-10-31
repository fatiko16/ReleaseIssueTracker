import prisma from "../../../db/client";
export default async function handler(req, res) {
  const data = req.body;
  const { id: pausedTCId } = data;

  try {
    const comments = await prisma.pauseComment.findMany({
      where: {
        pausedTCId: pausedTCId,
      },
    });

    if (comments.length === 0) {
      await prisma.pausedTC.delete({
        where: {
          id: pausedTCId,
        },
      });
    } else {
      res.status(400).json({
        message:
          "Cannot delete a paused TC item with existing pause comments. Delete the pause comments first then delete the paused TC.",
      });
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
  res.status(200).json({ name: "John Doe" });
}
