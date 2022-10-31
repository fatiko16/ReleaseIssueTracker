// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../db/client";
import { prismaStringMaxLength } from "../../../constants/dataverification";
export default async function handler(req, res) {
  const data = req.body;
  const { id: id, reason: reason, pausedTCId: pausedTCId } = data;

  if (reason.length <= prismaStringMaxLength) {
    try {
      await prisma.pausedTC.update({
        where: {
          id: id,
        },
        data: {
          reason: reason,
          TCId: pausedTCId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({
      message: "Pause reason cannot be longer than 191 characters.",
    });
    return;
  }

  res.status(200).json({ name: "John Doe" });
}
