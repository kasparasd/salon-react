import { Link } from "@inertiajs/react";

export function DeleteButton(props) {
  return (
    <Link
      href={props.href}
      className="bg-rose-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-rose-700"
    >
      {props.text}
    </Link>
  );
}
