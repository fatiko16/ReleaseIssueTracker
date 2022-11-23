import { getAllPausedTCs } from "../../../lib/helpers";
export default async function handler(req, res) {
  const data = req.body;
  const { releaseId } = data;
  const pausedTCs = await getAllPausedTCs(releaseId);
  res.status(200).json({ pausedTCs });
}
