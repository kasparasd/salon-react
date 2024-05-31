import { AddButton } from "@/Components/buttons/AddButton";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";
import { DeleteButton } from "@/Components/buttons/DeleteButton";
import { EditButton } from "@/Components/buttons/EditButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, procedures, ok }) {

  const deleteProcedure = (procedureId) => {
    if (!window.confirm("Are you sure you want to delete this procedure?")) {
      return;
    }
    router.delete(route("procedures.destroy", procedureId));
  }
 return (
  <AdminPanelLayout
   user={auth.user}
   header={
    <div className="flex justify-between items-center flex-wrap">
     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Roles
     </h2>
     <AddButtonBig href={route("procedures.create")} text="Add new" />
    </div>
   }
  >
   <Head title="Roles" />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr>
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
            <td className="px-4 py-2 border border-gray-300 flex flex-wrap gap-2 lg:gap-4">
             <AddButton
              href={route("procedures.edit", procedure.id)}
              text="Redaguoti"
             />
             <EditButton
              href={route("procedures.add-employees", procedure.id)}
              text="Pridėti darbuotojus"
             />

             <button
              onClick={() => deleteProcedure(procedure.id)}
              className="bg-rose-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-rose-700"
             >
              Trinti
             </button>
            </td>
           </tr>
          ))}
         </tbody>
        </table>
  </AdminPanelLayout>
 );
}
