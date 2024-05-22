import { Head, useForm } from "@inertiajs/react";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";
import { AddButton } from "@/Components/buttons/AddButton";
import { EditButton } from "@/Components/buttons/EditButton";

export default function Users({ auth, ok, user, roles, userRoles }) {
 const { data, setData, put } = useForm({
  name: user.name,
  email: user.email,
  roles: userRoles,
 });

 const handleAssignRoleToUser = (role) => {
  if (data.roles.includes(role)) {
   setData(
    "roles",
    data.roles.filter((r) => {
     r != role;
    })
   );
  } else {
   setData("roles", [...data.roles, role]);
  }
 };

 const onSubmit = (e) => {
  e.preventDefault();
  put(route("user.update", user.id));
 };

 return (
  <AdminPanelLayout
   user={auth.user}
   header={
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      Vartotojai
     </h2>
     <div className="mt-4 sm:mt-0">
      <AddButtonBig href={route("user.index")} text="Add new" />
     </div>
    </div>
   }
  >
   <Head title="Profile" />

   <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
     {ok && (
      <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
       {ok}
      </div>
     )}
     <div className="dark:bg-gray-800 overflow-hidden sm:rounded-lg">
      <div className="p-6 text-gray-900 dark:text-gray-100">
       <div className="overflow-auto">
        <form onSubmit={onSubmit}>
         <div className="mb-3">
          <label htmlFor="name" className="block">
           Name
          </label>
          <input
           onChange={(e) => setData("name", e.target.value)}
           value={data.name}
           type="text"
           name="name"
           id="name"
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
         </div>
         <div className="mb-3">
          <label htmlFor="email" className="block">
           Email
          </label>
          <input
           onChange={(e) => setData("email", e.target.value)}
           value={data.email}
           readOnly
           type="text"
           name="email"
           id="emaiil"
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
         </div>

         <div className="mb-3">
          <label htmlFor="password" className="block">
           Roles
          </label>
          {roles.map((role) => (
           <div key={role} className="flex items-center mb-4">
            <input
             onChange={() => handleAssignRoleToUser(role)}
             checked={data.roles.includes(role)}
             type="checkbox"
             value={role}
             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
             htmlFor="default-checkbox"
             className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
             {role}
            </label>
           </div>
          ))}
         </div>
         <div className="mb-3">
          <button
           type="submit"
           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
           Edit
          </button>
         </div>
        </form>
       </div>
      </div>
     </div>
    </div>
   </div>
  </AdminPanelLayout>
 );
}
