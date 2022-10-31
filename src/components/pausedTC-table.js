import PausedTC from "./pausedTC";
const DUMMY_PAUSEDTCS = [
  {
    reason: "This test case is paused for some reason",
    TCid: 1234,
    comments: [],
    id: 1,
  },
  {
    reason: "This test case is paused for some reason",
    TCId: 3235,
    comments: [],
    id: 2,
  },
  {
    reason: "This test case is paused for some reason",
    TCId: 5334,
    comments: [],
    id: 3,
  },
];
export default function PausedTCTable({ pausedTCs }) {
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
        {pausedTCs.length === 0 && (
          <tr>
            <td>
              <p>No paused TC.</p>
            </td>
          </tr>
        )}
        {pausedTCs.map((pausedTC) => {
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
