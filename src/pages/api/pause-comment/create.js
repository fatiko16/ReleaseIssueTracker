// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
import { prismaStringMaxLength } from "../../../constants/dataverification";
export default async function handler(req, res) {
  const data = req.body;
  const { pausedTCId: pausedTCId, description: description } = data;
  console.log(description);
  if (description.length <= prismaStringMaxLength) {
    try {
      await prisma.pauseComment.create({
        data: {
          description: description,
          pausedTC: {
            connect: {
              id: pausedTCId,
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
      .json({ message: "Pause comment cannot be longer than 191 characters." });
    return;
  }
  res.status(200).json({ name: "John Doe" });
}
