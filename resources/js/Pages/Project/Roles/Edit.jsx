import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { DeleteButton } from "@/Components/buttons/DeleteButton";
import { SubmitButton } from "@/Components/buttons/SubmitButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, role }) {
  const { data, setData, put, errors, reset } = useForm({
    name: role.name,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    put(route("roles.update", role.id));
  };

  return (
    <AdminPanelLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create role
          </h2>
          <DeleteButton href={route("roles.index")} text="Atgal" />
        </div>
      }
    >
      <Head title="Create role" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className=" dark:bg-gray-800 overflow-hidden sm:rounded-lg">
            <div className="p-1 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <h4 className="text-xl font-bold">Create Role</h4>
                <div className="p-4">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <InputLabel htmlFor="name" value="Rolės pavadinimas" />
                      <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      <InputError message={errors.name} className="mt-2" />
                    </div>

                    <SubmitButton text="Atnaujinti" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPanelLayout>
  );
}
