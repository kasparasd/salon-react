import { Link } from "@inertiajs/react";

export function EditButton(props) {
  return (
    <Link
      href={props.href}
      className="bg-blue-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-700 "
    >
      {props.text}
    </Link>
  );
}
