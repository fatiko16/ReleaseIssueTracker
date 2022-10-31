// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
export default async function handler(req, res) {
  const data = req.body;
  try {
    await prisma.comment.delete({
      where: {
        id: data.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ name: "John Doe" });
}
