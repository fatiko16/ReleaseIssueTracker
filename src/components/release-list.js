import Link from "next/link";
import Button from "./button";
const dummyReleases = [
  "An easy release",
  "An underdog release that fcks you up",
  "A long release",
];

export default function ReleaseList({ releases }) {
  return (
    <div className="w-8/12 text-start">
      <h2 className="text-yellow-300 font-bold text-2xl mb-2">All Releases</h2>
      {releases && (
        <ul className="rounded flex flex-col gap-4 p-2 bg-yellow-300">
          {releases.map((release) => {
            return (
              <div key={release.id}>
                <li>
                  <Link href={`/release/${release.id}`}>
                    <a className="text-emerald-900 pl-1 text-lg font-semibold rounded hover:text-emerald-400 hover:text-xl">
                      {release.name}
                    </a>
                  </Link>
                </li>

                <hr className="bg-emerald-400 h-1" />
              </div>
            );
          })}
        </ul>
      )}
      {!releases && (
        <p className="text-rose-500 font-medium text-lg">
          No release is added yet
        </p>
      )}
    </div>
  );
}
