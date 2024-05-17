import { Link } from "@inertiajs/react";

export default function AdminLinks({ auth }) {
  return (
    <div className="flex space-x-4">
      <Link
        href={route("procedures.index")}
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Proceduros
      </Link>
      <Link
        href="{{url('/roles')}}"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Roles
      </Link>
      <Link
        href="{{url('/users')}}"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Vartotojai
      </Link>
      <Link
        href="{{url('/procedure-schedule')}}"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Proceduru tvarkarastis
      </Link>
    </div>
  );
}
