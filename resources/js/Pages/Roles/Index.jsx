import { AddButton } from "@/Components/buttons/AddButton";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";
import { EditButton } from "@/Components/buttons/EditButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, roles, user, ok }) {
  const deleteRole = (roleId) => {
    if (!window.confirm("Are you sure you want to delete this role?")) {
      return;
    }
    router.delete(route("roles.destroy", roleId));
  };

  return (
    <AdminPanelLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Roles
          </h2>
          <AddButtonBig href={route("roles.create")} text="Add new" />
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
          <div className="dark:bg-gray-800 overflow-hidden sm:rounded-lg">
            <div className="p-1 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        Name
                      </th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.data.map((role) => (
                      <tr key={role.id}>
                        <td className="px-4 py-2 border border-gray-300">
                          {role.name}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 flex flex-wrap gap-2 lg:gap-4">
                          <AddButton
                            href={route("roles.addPermissionToRole", role.id)}
                            text="Add/Edit Role Permission"
                          />
                          <EditButton
                            href={route("roles.edit", role.id)}
                            text="Edit"
                          />
                          <button
                            onClick={() => deleteRole(role.id)}
                            className="bg-rose-600 py-1 px-3 text-white rounded shadow transition-all hover:bg-rose-700"
                          >
                            Trinti
                          </button>
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
