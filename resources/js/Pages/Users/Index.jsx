import { Head, router } from "@inertiajs/react";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";
import { EditButton } from "@/Components/buttons/EditButton";

export default function Users({ auth, mustVerifyEmail, status, ok, users }) {
 const deleteUser = (userId) => {
  if (!confirm("are you sure you want to delete?")) {
   return;
  } else {
   router.delete(route("user.destroy", userId));
  }
 };
 return (
  <AdminPanelLayout
   ok={ok}
   user={auth.user}
   header={
    <div className="flex justify-between items-center flex-wrap">
     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Vartotojai
     </h2>
     <AddButtonBig href={route("user.create")} text="Add new" />
    </div>
   }
  >
   <Head title="Profile" />

   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
     <tr className="whitespace-nowrap">
      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Name</th>
      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Email</th>
      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Roles</th>
      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Action</th>
     </tr>
    </thead>
    <tbody>
     {users.map((user) => (
      <tr key={user.id}>
       <td className="px-4 py-2 border border-gray-300">{user.name}</td>
       <td className="px-4 py-2 border border-gray-300">{user.email}</td>
       <td className="px-4 py-2 border border-gray-300">
        <div className="flex flex-wrap gap-2">
         {user.roles.map((role, index) => (
          <label
           key={index}
           className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
          >
           {role}
          </label>
         ))}
        </div>
       </td>
       <td className="px-4 py-2 border border-gray-300 flex flex-wrap gap-2">
        <EditButton href={route("user.edit", user.id)} text="Edit" />
        <button
         onClick={() => deleteUser(user.id)}
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
