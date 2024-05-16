
export function SubmitButton(props) {
  return (
    <button
      type="submit"
      className="bg-blue-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-700 "
    >
      {props.text}
    </button>
  );
}
