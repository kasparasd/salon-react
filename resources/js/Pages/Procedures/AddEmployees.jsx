import Checkbox from "@/Components/Checkbox";
import { DeleteButton } from "@/Components/buttons/DeleteButton";
import { SubmitButton } from "@/Components/buttons/SubmitButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, useForm } from "@inertiajs/react";

export default function AddEmployees({
 auth,
 users,
 procedure,
 usersAssignedToProcedure,
 ok,
}) {
 const { data, setData, post } = useForm({
  users: usersAssignedToProcedure,
 });

 const handleAssignUserToProcedure = (user) => {
  if (data.users.includes(user.id)) {
   setData(
    "users",
    data.users.filter((u) => u !== user.id)
   );
  } else {
   setData("users", [...data.users, user.id]);
  }
 };

 return (
  <AdminPanelLayout
   ok={ok}
   user={auth.user}
   header={
    <div className="flex justify-between items-center flex-wrap">
     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Roles
     </h2>
     <DeleteButton href={route("procedures.index")} text="Atgal" />
    </div>
   }
  >
   <Head title="Roles" />
   <form
    onSubmit={(e) => {
     e.preventDefault();
     post(route("procedures.employee-to-procedure", procedure));
    }}
    className="w-full max-w-lg"
   >
    <div className="mb-5">
     <div className="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
      Priskirkite procedurai - {procedure.name} darbuotojus:
     </div>
     {users.map((user) => (
      <div key={user.id}>
       <label className="inline-flex items-center">
        <Checkbox
         checked={data.users.includes(user.id)}
         value={user.id}
         onChange={() => handleAssignUserToProcedure(user)}
        />
        <span className="ml-2">{user.name}</span>
       </label>
      </div>
     ))}

     <SubmitButton text="Priskirti" />
    </div>
   </form>
  </AdminPanelLayout>
 );
}
