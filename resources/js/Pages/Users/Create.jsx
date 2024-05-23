import InputError from "@/Components/InputError";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";
import { DeleteButton } from "@/Components/buttons/DeleteButton";
import { SubmitButton } from "@/Components/buttons/SubmitButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth, ok, roles,errors }) {
 const { setData, post, data } = useForm({
  name: "",
  email: "",
  password: "",
  roles: [],
 });

 const handleAssignedRoles = (role) => {
  if (data.roles.includes(role)) {
   setData(
    "roles",
    data.roles.filter((r) => {
     return r !== role;
    })
   );
  } else {
   setData("roles", [...data.roles, role]);
  }
 };

 const onSubmit = (e) => {
  e.preventDefault();
  post(route("user.store"));
 };

 return (
  <AdminPanelLayout
   user={auth.user}
   header={
    <div className="flex justify-between items-center">
    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Sukurti Vartotoja
    </h2>
    <DeleteButton href={route("user.index")} text="Atgal" />
  </div>
   }
  >
   <Head title="Kurti nauja vartotoja" />

   <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
     {ok && (
      <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
       {ok}
      </div>
     )}
     <div className="dark:bg-gray-800 overflow-hidden sm:rounded-lg">
      <div className="p-1 text-gray-900 dark:text-gray-100">
       <div className="overflow-auto">
        <form onSubmit={onSubmit} className="w-full max-w-lg">
         <div className="mb-3">
          <label htmlFor="name" className="block">
           Name
          </label>
          <input
           onChange={(e) => setData("name", e.target.value)}
           type="text"
           name="name"
           id="name"
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <InputError message={errors.name} className="mt-2" />
         </div>
         <div className="mb-3">
          <label htmlFor="email" className="block">
           Email
          </label>
          <input
           onChange={(e) => setData("email", e.target.value)}
           type="text"
           name="email"
           id="emaiil"
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
                    <InputError message={errors.email} className="mt-2" />

         </div>
         <div className="mb-3">
          <label htmlFor="password" className="block">
           Password
          </label>
          <input
           onChange={(e) => setData("password", e.target.value)}
           type="password"
           name="password"
           id="password"
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
                    <InputError message={errors.password} className="mt-2" />

         </div>
         <div className="mb-3">
          <label htmlFor="password" className="block">
           Roles
          </label>
          {roles.map((role) => (
           <div key={role} className="flex items-center mb-4">
            <input
             onChange={() => handleAssignedRoles(role)}
             name="roles[]"
             type="checkbox"
             value="{{$role}}"
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
          <SubmitButton text="Sukurti" />
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
