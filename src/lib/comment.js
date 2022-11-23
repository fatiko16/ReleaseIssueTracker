import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import domain from "../constants/domain";
async function addNewComment(data) {
  await fetch(`${domain}/api/comment/create`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useAddNewComment() {
  const queryClient = useQueryClient();
  return useMutation(addNewComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}

async function deleteComment(commentId) {
  await fetch(`${domain}/api/comment/delete`, {
    body: JSON.stringify({
      id: commentId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}
