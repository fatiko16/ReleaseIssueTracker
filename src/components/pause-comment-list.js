import Button from "./button";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function PauseCommentList({ pauseComments, pausedTCId }) {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [newCommentError, setNewCommentError] = useState(null);

  const refreshData = () => {
    router.replace(router.asPath);
  };
  async function addComment() {
    if (newComment !== null && newComment.length > 0) {
      let response;
      try {
        response = await fetch(
          "http://localhost:3000/api/pause-comment/create",
          {
            body: JSON.stringify({
              description: newComment,
              pausedTCId: pausedTCId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
      } catch (error) {
        console.log(error);
      }
      if (response.ok) {
        setNewComment("");
        setNewCommentError(null);
        refreshData();
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setNewCommentError(errorData.message);
        }
      }
    } else {
      setNewComment("Issue description cannot be empty.");
      return;
    }
  }

  async function deleteComment(commentId) {
    try {
      await fetch("http://localhost:3000/api/pause-comment/delete", {
        body: JSON.stringify({
          id: commentId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ul className="text-yellow-100 text-base">
      {pauseComments &&
        pauseComments.map((comment) => {
          return (
            <div key={comment.id}>
              <li className="flex items-center gap-4">
                <p>{comment.description}</p>
                <button
                  className="text-red-400 ml-auto"
                  onClick={() => deleteComment(comment.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </li>
            </div>
          );
        })}
      {!pauseComments && <p>No pause comment yet!</p>}

      <li>
        <input
          type="text"
          id="release"
          className="w-full mt-2 rounded h-6 px-2 text-black"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        {newCommentError && (
          <p className="text-red-500 text-lg mt-2">{newCommentError}</p>
        )}
        <Button
          description="Add Comment"
          type="button"
          className="my-1 text-base text-emerald-700"
          onClick={() => addComment()}
        />
      </li>
    </ul>
  );
}
