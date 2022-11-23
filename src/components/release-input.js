import Button from "./button";
import { useState } from "react";

export default function ReleaseInput({
  initialReleaseName,
  updateReleaseName,
}) {
  const [releaseName, setReleaseName] = useState(initialReleaseName);
  const [releaseNameError, setReleaseNameError] = useState(null);

  const onUpdateReleaseName = async () => {
    if (releaseName !== null && releaseName.trim().length > 0) {
      await updateReleaseName(releaseName, setReleaseNameError);
    } else {
      setReleaseNameError("Release name cannot be empty");
    }
  };
  return (
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
        onClick={() => onUpdateReleaseName()}
      />
    </div>
  );
}
