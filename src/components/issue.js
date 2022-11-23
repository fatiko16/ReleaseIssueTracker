import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import CommentList from "./comment-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Button from "./button";
import domain from "../constants/domain";
import { useDeleteIssue, useUpdateIssue } from "../lib/issue";

export default function Issue({ name, isResolved, comments, id }) {
  const [parent] = useAutoAnimate();
  const router = useRouter();

  const [description, setDescription] = useState(name);
  const [showDetails, setShowDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(isResolved);
  const [error, setError] = useState(null);
  const { mutate: deleteIssue } = useDeleteIssue();
  const { mutate: updateIssue } = useUpdateIssue();

  async function handleCheck() {
    try {
      await fetch(`${domain}/api/issue/update-checkbox`, {
        body: JSON.stringify({
          id: id,
          isResolved: !isChecked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      setIsChecked(!isChecked);
    } catch (error) {
      console.log(error);
    }
  }

  async function onUpdateIssue() {
    if (description !== null && description.length > 0) {
      updateIssue({ id: id, description: description });
    } else {
      setError("Description cannot be empty!");
    }
  }

  return (
    <>
      <tr>
        <td ref={parent} className="max-w-2xl">
          <div className="flex items-center gap-4">
            <button className="text-red-400" onClick={() => deleteIssue(id)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          {" "}
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
            checked={isChecked}
            onChange={() => handleCheck()}
          />
        </td>
        <td className="text-center">
          <Button
            description="Update"
            type="button"
            className="my-1 text-base text-emerald-700"
            onClick={() => onUpdateIssue()}
          />
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-yellow-300 text-xl">Comments</h1>
            </div>
            <CommentList issueId={id} comments={comments} />
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
