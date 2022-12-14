import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import PauseCommentList from "./pause-comment-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Button from "./button";
import domain from "../constants/domain";
import { useDeletePausedTC, useUpdatePausedTC } from "../lib/pausedTC";
export default function PausedTC({ reason, pauseComments, TCId, id }) {
  const [showDetails, setShowDetails] = useState(false);
  const [parent] = useAutoAnimate();
  const router = useRouter();
  const [pausedTCId, setPausedTCId] = useState(TCId);
  const [pauseReason, setPauseReason] = useState(reason);
  const [error, setError] = useState(null);
  console.log(reason, "reason");
  console.log(pauseComments, "Pause Comments");
  console.log(TCId, "TC Id");
  console.log(id);
  const { mutate: deletePausedTC } = useDeletePausedTC();
  const { mutate: updatePausedTC } = useUpdatePausedTC();

  async function update() {
    if (
      pauseReason !== null &&
      pauseReason.length > 0 &&
      pausedTCId !== null &&
      pausedTCId.toString().length > 0
    ) {
      updatePausedTC({ id: id, reason: pauseReason, pausedTCId: pausedTCId });
    }
  }

  return (
    <>
      <tr>
        <td ref={parent} className="max-w-2xl ">
          <div className="flex items-center gap-4">
            <button className="text-red-400" onClick={() => deletePausedTC(id)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {/* <p className="break-all w-8/12">{reason}</p> */}
            <input
              type="text"
              value={pauseReason}
              onChange={(e) => setPauseReason(e.target.value)}
              className="px-1 rounded w-8/12 text-black"
            />

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="rounded-md bg-yellow-400 m-2 p-1 text-emerald-700 font-medium text-center h-5 my-auto"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.05.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </td>
        <td className="text-center">
          <input
            type="text"
            className="px-1 w-5/12 text-black bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            value={pausedTCId}
            onChange={(e) => setPausedTCId(e.target.value)}
          />
        </td>
        <td className="text-center">
          <Button
            description="Update"
            type="button"
            className="my-1 text-base text-emerald-700"
            onClick={() => update()}
          />
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-yellow-300 text-xl">
                Pause Comments
              </h1>
            </div>
            <PauseCommentList pausedTCId={id} pauseComments={pauseComments} />
          </td>
        </tr>
      )}
      {error && (
        <tr>
          <td>
            <p className="text-red-500 text-lg mt-2">{error}</p>
          </td>
        </tr>
      )}
    </>
  );
}
