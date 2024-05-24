import { Link } from "@inertiajs/react";

export default function AdminLinks({ auth }) {
  return (
    <div className="flex space-x-4">
      <Link
        href={route("procedures.index")}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Proceduros
      </Link>
      <Link
        href="{{url('/roles')}}"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Roles
      </Link>
      <Link
        href="{{url('/users')}}"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Vartotojai
      </Link>
      <Link
        href="{{url('/procedure-schedule')}}"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Proceduru tvarkarastis
      </Link>
    </div>
  );
}
