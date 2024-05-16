import { Link } from "@inertiajs/react";

export function AddButtonBig(props) {
  return (
    <Link
      href={props.href}
      className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
      >
      {props.text}
    </Link>
  );
}
