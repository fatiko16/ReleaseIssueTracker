import Issue from "./issue";

export default function IssuesTable({ issues }) {
  return (
    <table className="w-full text-left border-2 border-separate border-spacing-4 rounded border-yellow-300 mx-auto">
      <thead className=" text-xl">
        <tr className="text-yellow-300">
          <th className="w-9/12">Issue Description</th>
          <th className="text-center">Is Resolved?</th>
          <th className="text-center">Options</th>
        </tr>
      </thead>
      <tbody className="text-cyan-300 text-lg font-medium">
        {issues.length === 0 && (
          <tr>
            <td>
              <p>No issue to see. Lucky you!</p>
            </td>
          </tr>
        )}
        {issues.map((issue) => {
          return (
            <Issue
              key={issue.id}
              name={issue.name}
              isResolved={issue.isResolved}
              comments={issue.comments}
              id={issue.id}
            />
          );
        })}
      </tbody>
    </table>
  );
}
