import Checkbox from "@/Components/Checkbox";
import { DeleteButton } from "@/Components/buttons/DeleteButton";
import { SubmitButton } from "@/Components/buttons/SubmitButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AddPermission({
 auth,
 permissions,
 role,
 rolePermissions,
}) {
 const [rolePermissionsArr, setRolePermissions] = useState(rolePermissions);

 const { setData, put } = useForm({
  permissions: "",
  _method: "put",
 });

 useEffect(() => {
  setData("permissions", rolePermissionsArr);
 }, [rolePermissionsArr]);

 const onSubmit = (e) => {
  e.preventDefault();
  put(route("roles.givePermissionToRole", role.id));
 };

 const handleCheckboxChange = (permissionId) => {
  if (rolePermissionsArr.includes(permissionId)) {
   setRolePermissions(rolePermissionsArr.filter((id) => id !== permissionId));
  } else {
   setRolePermissions([...rolePermissionsArr, permissionId]);
  }
 };

 return (
  <AdminPanelLayout
   user={auth.user}
   header={
    <div className="flex justify-between items-center">
     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Rolė : "{role.name}"
     </h2>
     <DeleteButton href={route("roles.index")} text="Atgal" />
    </div>
   }
  >
   <Head title="Roles" />
   <form onSubmit={onSubmit}>
    <div className="mb-3">
     <label htmlFor="permissions" className="block">
      Permissions
     </label>

     <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {permissions.data.map((permission) => (
       <div key={permission.id}>
        <label className="inline-flex items-center">
         <Checkbox
          value={permission.id}
          checked={rolePermissionsArr.includes(permission.id)}
          onChange={() => handleCheckboxChange(permission.id)}
         />
         <span className="ml-2">{permission.name}</span>
        </label>
       </div>
      ))}
     </div>

     <div className="mb-3">
      <SubmitButton text="Update" />
     </div>
    </div>
   </form>
  </AdminPanelLayout>
 );
}
