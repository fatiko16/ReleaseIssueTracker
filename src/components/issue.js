import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useEffect } from "react";
import CommentList from "./comment-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Button from "./button";
import Modal from "../components/modal";
import domain from "../constants/domain";

export default function Issue({ name, isResolved, comments, id }) {
  // const [isModelOpened, setIsModelOpened] = useState(false);
  const [description, setDescription] = useState(name);
  const [showDetails, setShowDetails] = useState(false);
  const [isChecked, setIsChecked] = useState(isResolved);
  const [error, setError] = useState(null);
  const [parent] = useAutoAnimate();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  // const closeModal = () => {
  //   if (isModelOpened) {
  //     setIsModelOpened(false);
  //   }
  //   console.log(isModelOpened);
  // };

  // useEffect(() => {
  //   const keyDownHandler = (event) => {
  //     if (event.key === "Escape") {
  //       event.preventDefault();
  //       closeModal();
  //     }
  //   };
  //   document.addEventListener("keydown", keyDownHandler);
  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

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

  async function deleteIssue() {
    let response;
    try {
      response = await fetch(`${domain}/api/issue/delete`, {
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }
    if (response.ok) {
      refreshData();
    } else {
      if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.message);
      }
    }
  }

  async function updateIssue() {
    let response;
    if (description !== null && description.length > 0) {
      try {
        response = await fetch(`${domain}/api/issue/update`, {
          body: JSON.stringify({
            id: id,
            description: description,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      } catch (error) {
        console.log(error);
      }
      if (response.ok) {
        refreshData();
        setError(null);
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setError(errorData.message);
        }
      }
    } else {
      setError("Issue description cannot be empty.");
      return;
    }
  }

  return (
    <>
      <tr>
        <td ref={parent} className="max-w-2xl">
          {/* <button onClick={() => setIsModelOpened(true)}>
          Click Me For the Modal
        </button>
        <Modal isOpened={isModelOpened} onClose={() => setIsModelOpened(false)}>
          <div className="text-center flex flex-col gap-4 text-white">
            <p className=" mt-6">
              Are you sure to delete this issue and all comments related to the
              issue?
            </p>
            <div>
              <button className="mr-4 rounded border w-3/12">Yes</button>
              <button
                className="rounded border w-3/12"
                onClick={() => setIsModelOpened(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal> */}

          <div className="flex items-center gap-4">
            <button className="text-red-400" onClick={deleteIssue}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            {/* <p className="break-all w-8/12">{name}</p> */}
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
            onClick={() => updateIssue()}
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
