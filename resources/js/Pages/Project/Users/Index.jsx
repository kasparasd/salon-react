import { Head } from "@inertiajs/react";
import AdminLinks from "@/Components/AdminLinks";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";

export default function Users({ auth, mustVerifyEmail, status, ok }) {
 return (
  <AdminPanelLayout
   user={auth.user}
   header={
    <div className="flex justify-between items-center">
     <h2 className="font-semibold text-xl text-gray-800 leading-tight">
      Vartotojai
     </h2>
     <AddButtonBig href={route("user.index")} text="Add new" />
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
          <div className=" dark:bg-gray-800 overflow-hidden sm:rounded-lg">
            <div className="p-1 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        Id
                      </th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        Name
                      </th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {roles.data.map((role) => (
                      <tr key={role.id}>
                        <td className="px-4 py-2 border border-gray-300">
                          {role.id}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {role.name}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 flex gap-4 ">
                          <AddButton
                            href={route("roles.addPermissionToRole", role.id)}
                            text="Add/Edit Role Permission"
                          />
                          <EditButton
                            href={route("roles.edit", role.id)}
                            text="Edit"
                          />
                          <button
                            onClick={(e) => deleteRole(role.id)}
                            className="bg-rose-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-rose-700"
                          >
                            Trinti
                          </button>
                        </td>
                      </tr>
                    ))} */}
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
