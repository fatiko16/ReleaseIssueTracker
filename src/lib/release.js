import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import domain from "../constants/domain";

//Change name of below function as well
async function fetchAllReleases() {
  const res = await fetch(`${domain}/api/release/releases`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return await res.json();
}
//Change this one after changing previous
export function useAllReleaseData(onSuccess, onError) {
  return useQuery(["releases"], fetchAllReleases);
}

async function addNewRelease(name) {
  await fetch(`${domain}/api/release/create`, {
    body: JSON.stringify({
      name: name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useAddNewRelease() {
  const queryClient = useQueryClient();
  return useMutation(addNewRelease, {
    onSuccess: () => {
      queryClient.invalidateQueries("releases");
    },
  });
}

async function fetchSingleReleaseData(releaseId) {
  const res = await fetch(`${domain}/api/release/${releaseId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return await res.json();
}

export function useSingleReleaseData(releaseId) {
  let isEnabled;
  if (releaseId) {
    isEnabled = true;
  } else {
    isEnabled = false;
  }
  return useQuery(
    [`release/${releaseId}`, releaseId],
    () => fetchSingleReleaseData(releaseId),
    { enabled: isEnabled }
  );
}

async function updateReleaseName(data) {
  await fetch(`${domain}/api/release/updateName`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export function useUpdateReleaseName(releaseId) {
  const queryClient = useQueryClient();
  return useMutation(updateReleaseName, {
    onSuccess: () => {
      queryClient.invalidateQueries(`release/${releaseId}`);
    },
  });
}
