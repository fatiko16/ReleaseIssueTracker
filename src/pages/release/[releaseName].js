import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../../components/button";
import prisma from "../../db/client";
import IssuesTable from "../../components/issues-table";
import PausedTCTable from "../../components/pausedTC-table";
import Head from "next/head";
import domain from "../../constants/domain";

// Generates `/posts/1` and `/posts/2`

//Update this part before changing path name to release name instead of the release id
export async function getStaticPaths() {
  let releaseIds;
  try {
    releaseIds = await prisma.release.findMany({
      select: {
        id: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
  releaseIds = releaseIds.map((idObj) => {
    return {
      params: {
        releaseName: idObj.id.toString(),
      },
    };
  });

  return {
    paths: releaseIds,
    fallback: "blocking", // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  let releaseInfo;
  let issues;
  let pausedTCs;
  try {
    releaseInfo = await prisma.release.findUnique({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: Number(params.releaseName),
      },
    });
    issues = await prisma.issue.findMany({
      select: {
        id: true,
        name: true,
        comments: true,
        isResolved: true,
      },
      where: {
        releaseId: releaseInfo.id,
      },
    });
    pausedTCs = await prisma.pausedTC.findMany({
      select: {
        id: true,
        TCId: true,
        reason: true,
        pauseComments: true,
      },
      where: {
        releaseId: releaseInfo.id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  issues.forEach((issue) => {
    issue.comments.map((comment) => {
      comment.createdAt = Math.floor(comment.createdAt / 1000);
      comment.updatedAt = Math.floor(comment.updatedAt / 1000);
      return comment;
    });
  });
  pausedTCs.forEach((pausedTC) => {
    pausedTC.pauseComments.map((comment) => {
      comment.createdAt = Math.floor(comment.createdAt / 1000);
      comment.updatedAt = Math.floor(comment.updatedAt / 1000);
      return comment;
    });
  });

  return {
    // Passed to the page component as props
    props: { releaseInfo, issues, pausedTCs },
    revalidate: 1,
  };
}

export default function Release({ releaseInfo, issues, pausedTCs }) {
  const router = useRouter();
  const parameters = router.query;
  const initialReleaseName = parameters.releaseName;
  const [releaseName, setReleaseName] = useState(releaseInfo.name);
  const [releaseNameError, setReleaseNameError] = useState(null);
  const [newIssue, setNewIssue] = useState("");
  const [newIssueError, setNewIssueError] = useState(null);
  const [newPausedTCReason, setNewPausedTCReason] = useState("");
  const [newPausedTCTFSId, setNewPausedTCTFSId] = useState("");
  const [newPausedTCError, setNewPausedTCError] = useState(null);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function updateReleaseName() {
    if (releaseName !== null && releaseName.length > 0) {
      try {
        await fetch(`${domain}/api/release/updateName`, {
          body: JSON.stringify({
            id: releaseInfo.id,
            newName: releaseName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      } catch (error) {
        console.log(error);
      }
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
      }
      setReleaseNameError(null);
      refreshData();
    } else {
      setReleaseNameError("Release name cannot be empty.");
      return;
    }
  }
  async function addIssue() {
    if (newIssue !== null && newIssue.length > 0) {
      let response;
      try {
        response = await fetch(`${domain}/api/issue/create`, {
          body: JSON.stringify({
            name: newIssue,
            releaseId: releaseInfo.id,
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
        setNewIssue("");
        setNewIssueError(null);
        refreshData();
        const error = await response.json();
        console.log(error);
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setNewIssueError(errorData.message);
        }
      }
    } else {
      setNewIssueError("Issue description cannot be empty.");
      return;
    }
  }

  async function addPausedTC() {
    if (
      newPausedTCReason !== null &&
      newPausedTCReason.length > 0 &&
      newPausedTCTFSId != null &&
      newPausedTCTFSId.length > 0
    ) {
      let response;

      try {
        response = await fetch(`${domain}/api/pausedTC/create`, {
          body: JSON.stringify({
            reason: newPausedTCReason,
            tfsId: newPausedTCTFSId,
            releaseId: releaseInfo.id,
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
        setNewPausedTCReason("");
        setNewPausedTCTFSId("");
        setNewPausedTCError(null);
        refreshData();
        const error = await response.json();
        console.log(error);
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setNewPausedTCError(errorData.message);
        }
      }
    } else {
      setNewPausedTCError("Pause reason or TFS Id cannot be empty.");
      return;
    }
  }

  return (
    <>
      <Head>
        <title>{releaseName}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="w-9/12">
        <Link href={"/"}>
          <a className="text-cyan-300 font-semibold text-2xl hover:text-cyan-500 hover:text-3xl">
            Go Back To Home Page
          </a>
        </Link>
        {initialReleaseName && (
          <div className="mt-4 text-start">
            <label htmlFor="release" className="font-semibold">
              Release Name:
              <input
                type="text"
                id="release"
                className="w-9/12 mt-2 rounded h-9 px-2 block"
                value={releaseName}
                onChange={(e) => setReleaseName(e.target.value)}
              />
            </label>
            {releaseNameError && (
              <p className="mt-2 text-red-600 font-semibold text-lg">
                {releaseNameError}
              </p>
            )}
            <Button
              description="Update"
              type="button"
              onClick={() => updateReleaseName()}
            />
          </div>
        )}
        {!initialReleaseName && (
          <div className="flex justify-center items-center">
            <p className="text-center text-2xl font-semibold text-yellow-300 mt-10">
              Hydrating the release name.
            </p>
          </div>
        )}
      </div>
      <div className="w-full sm:w-9/12">
        <h1 className="text-yellow-300 font-semibold text-2xl my-4 text-start">
          Issues
        </h1>
        <IssuesTable issues={issues} />
        <div className="mt-4 text-start">
          <label htmlFor="release" className="font-bold">
            Add New Issue:
            <input
              type="text"
              id="new-issue-input"
              className="w-9/12 block mt-2 rounded h-9 px-2 "
              value={newIssue}
              onChange={(e) => setNewIssue(e.target.value)}
            />
          </label>
          {newIssueError && (
            <p className="mt-2 text-red-500 font-bold text-lg">
              {newIssueError}
            </p>
          )}
          <Button
            description="Create"
            type="submit"
            onClick={() => addIssue()}
          />
        </div>
      </div>
      <div className="w-full sm:w-9/12">
        <h1 className="text-yellow-300 font-semibold text-2xl my-4 text-start">
          Paused Test Cases
        </h1>
        <PausedTCTable pausedTCs={pausedTCs} />
        <div className="mt-4 text-start">
          <label htmlFor="release" className="font-bold">
            TFS ID:
            <input
              type="number"
              id="new-paused-tc-reason"
              className="w-3/12 my-2 rounded h-9 px-2 block"
              value={newPausedTCTFSId}
              onChange={(e) => setNewPausedTCTFSId(e.target.value)}
            />
          </label>
          <label htmlFor="release" className="text-lg font-bold">
            Pause Reason:
            <input
              type="text"
              id="new-paused-tc-reason"
              className="w-9/12 block mt-2 rounded h-9 px-2"
              value={newPausedTCReason}
              onChange={(e) => setNewPausedTCReason(e.target.value)}
            />
          </label>
          {newPausedTCError && (
            <p className="mt-2 text-red-500 font-bold text-lg">
              {newPausedTCError}
            </p>
          )}
          <Button
            description="Create"
            type="submit"
            onClick={() => addPausedTC()}
          />
        </div>
      </div>
    </>
  );
}
