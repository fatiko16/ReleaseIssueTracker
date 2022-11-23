import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import domain from "../constants/domain";
async function addNewPauseComment(data) {
  await fetch(`${domain}/api/pause-comment/create`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useAddNewPauseComment() {
  const queryClient = useQueryClient();
  return useMutation(addNewPauseComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}

async function deletePauseComment(commentId) {
  await fetch(`${domain}/api/pause-comment/delete`, {
    body: JSON.stringify({
      id: commentId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useDeletePauseComment() {
  const queryClient = useQueryClient();
  return useMutation(deletePauseComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}
