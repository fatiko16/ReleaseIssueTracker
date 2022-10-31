export default function Button(props) {
  return (
    <button
      className={"rounded-md bg-yellow-400 mr-2 my-2 p-1 " + props.className}
      onClick={props.onClick}
      type={props.type}
    >
      {props.description}
    </button>
  );
}
