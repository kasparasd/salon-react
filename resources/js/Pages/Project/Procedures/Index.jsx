import { AddButton } from "@/Components/buttons/AddButton";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";
import { DeleteButton } from "@/Components/buttons/DeleteButton";
import { EditButton } from "@/Components/buttons/EditButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, procedures, ok }) {
 return (
  <AdminPanelLayout
   user={auth.user}
   header={
    <div className="flex justify-between items-center">
     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Roles
     </h2>
     <AddButtonBig href={route("procedures.create")} text="Add new" />
    </div>
   }
  >
   <Head title="Roles" />

   <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
     {ok && (
      <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
       {ok}
      </div>
     )}
     <div className=" dark:bg-gray-800 overflow-hidden sm:rounded-lg">
      <div className="p-6 text-gray-900 dark:text-gray-100">
       <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
           <th className="px-4 py-2 bg-gray-200 border border-gray-300">
            Proceduros pavadinimas
           </th>
           <th className="px-4 py-2 bg-gray-200 border border-gray-300">
            Veiksmai
           </th>
          </tr>
         </thead>
         <tbody>
          {procedures.map((procedure) => (
           <tr key={procedure.id}>
            <td className="px-4 py-2 border border-gray-300">
             {procedure.name}
            </td>
            <td className="px-4 py-2 border border-gray-300 flex gap-4 ">
             <AddButton
              href={route("procedures.edit", procedure.id)}
              text="Redaguoti pavadinima"
             />
             <EditButton
              href={route("procedures.add-employees", procedure.id)}
              text="Pridėti darbuotojus"
             />
             <DeleteButton
              href={route("procedures.add-employees", procedure.id)}
              text="Ištrinti"
             />
            </td>
           </tr>
          ))}
         </tbody>
        </table>
       </div>
      </div>
     </div>
    </div>
   </div>
  </AdminPanelLayout>
 );
}