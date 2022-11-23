import PausedTC from "./pausedTC";

export default function PausedTCTable({ pausedTCs, isLoading }) {
  return (
    <table className="w-full text-left border-2 border-separate border-spacing-4 rounded border-yellow-300 mx-auto">
      <thead className=" text-xl">
        <tr className="text-yellow-300">
          <th className="w-9/12">Pause Reason</th>
          <th className="text-center">Paused Test Case Id</th>
          <th className="text-center">Options</th>
        </tr>
      </thead>
      <tbody className="text-cyan-300 text-lg font-medium">
        {isLoading && (
          <tr>
            <td>
              <p>Loading...</p>
            </td>
          </tr>
        )}

        {pausedTCs && pausedTCs.length === 0 && (
          <tr>
            <td>
              <p>No paused TC.</p>
            </td>
          </tr>
        )}
        {pausedTCs &&
          pausedTCs.map((pausedTC) => {
            return (
              <PausedTC
                key={pausedTC.id}
                reason={pausedTC.reason}
                pauseComments={pausedTC.pauseComments}
                TCId={pausedTC.TCId}
                id={pausedTC.id}
              />
            );
          })}
      </tbody>
    </table>
  );
}
