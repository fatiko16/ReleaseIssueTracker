import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import domain from "../constants/domain";

async function addNewPausedTC(data) {
  const response = await fetch(`${domain}/api/pausedTC/create`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useAddNewPausedTC() {
  const queryClient = useQueryClient();
  return useMutation(addNewPausedTC, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}

async function deletePausedTC(pausedTCId) {
  await fetch(`${domain}/api/pausedTC/delete`, {
    body: JSON.stringify({
      id: pausedTCId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useDeletePausedTC() {
  const queryClient = useQueryClient();
  return useMutation(deletePausedTC, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}

async function updatePausedTC(data) {
  await fetch(`${domain}/api/pausedTC/update`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useUpdatePausedTC() {
  const queryClient = useQueryClient();
  return useMutation(updatePausedTC, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}
