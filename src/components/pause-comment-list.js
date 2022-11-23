import Button from "./button";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  useAddNewPauseComment,
  useDeletePauseComment,
} from "../lib/pause-comment";
export default function PauseCommentList({ pauseComments, pausedTCId }) {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [newCommentError, setNewCommentError] = useState(null);

  const { mutate: addComment } = useAddNewPauseComment();
  const { mutate: deleteComment } = useDeletePauseComment();

  async function onAddComment() {
    if (newComment !== null && newComment.length > 0) {
      addComment(
        { pausedTCId: Number(pausedTCId), description: newComment },
        { onSuccess: setNewComment("") }
      );
    } else {
      setNewCommentError("Comment cannot be empty!");
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
          onClick={() => onAddComment()}
        />
      </li>
    </ul>
  );
}
