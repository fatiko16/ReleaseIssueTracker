import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import domain from "../constants/domain";

async function addNewIssue(data) {
  await fetch(`${domain}/api/issue/create`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useAddNewIssue() {
  const queryClient = useQueryClient();
  return useMutation(addNewIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}

async function deleteIssue(issueId) {
  await fetch(`${domain}/api/issue/delete`, {
    body: JSON.stringify({
      id: issueId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useDeleteIssue() {
  const queryClient = useQueryClient();
  return useMutation(deleteIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}

async function updateIssue(data) {
  await fetch(`${domain}/api/issue/update`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useUpdateIssue() {
  const queryClient = useQueryClient();
  return useMutation(updateIssue, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}
