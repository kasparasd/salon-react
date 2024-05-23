import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function RegisterToProcedure2({ auth, procedure, employees }) {
 return (
  <AuthenticatedLayout
   user={auth.user}
   header={
    <div className="flex justify-between items-center flex-wrap">
     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Pasirinkta paslauga: {procedure.name}
     </h2>
    </div>
   }
  >
   <Head title="Registruotis procedūrai" />
   <div className="dark:bg-gray-800 overflow-hidden sm:rounded-lg">
    <div className="p-1 text-gray-900 dark:text-gray-100">
     <div className="overflow-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 flex flex-col items-center justify-center">
         <h1>Pasirinkite specialista</h1>

         <ul className="w-96 text-surface dark:text-white">
          {employees.length ? (
           employees.map((employee) => {
            return (
             <Link
              key={employee.id}
              href={route("procedures.register-3", {
               procedure: procedure.id,
               employee: employee.id,
              })}
             >
              <li className="w-full border-b-2 border-neutral-100 py-4 dark:border-white/10">
               {employee.name}
              </li>
             </Link>
            );
           })
          ) : (
           <p>Siuo metu specialistu neturime</p>
          )}
         </ul>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </AuthenticatedLayout>
 );
}
