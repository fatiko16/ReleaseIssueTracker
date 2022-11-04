import { getAllReleases } from "../../../lib/helpers";
export default async function handler(req, res) {
  const allReleases = await getAllReleases();
  res.status(200).json({ releases: allReleases });
}
