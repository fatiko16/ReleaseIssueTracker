// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
export default async function handler(req, res) {
  const data = req.body;
  try {
    await prisma.release.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.newName,
      },
    });
  } catch (error) {
    console.log("Feel like nothing is going wrong but still no update");
    console.log(error);
    console.log(error.message);
  }

  res.status(200).json({ name: "John Doe" });
}
