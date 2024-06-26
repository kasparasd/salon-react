import { AddButton } from "@/Components/buttons/AddButton";
import { AddButtonBig } from "@/Components/buttons/AddButtonBig";
import { DeleteButton } from "@/Components/buttons/DeleteButton";
import { EditButton } from "@/Components/buttons/EditButton";
import { SubmitButton } from "@/Components/buttons/SubmitButton";
import AdminPanelLayout from "@/Layouts/AdminPanelLayout";
import { Head, router, useForm } from "@inertiajs/react";

export default function Create({ auth, durations, ok }) {
 const { data, setData, post, errors, reset } = useForm({
  name: "",
  duration: "",
 });

 return (
  <AdminPanelLayout
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
     post(route("procedures.store"));
    }}
    className="w-full max-w-lg"
   >
    <div className="mb-5">
     <label
      htmlForfor="name"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
     >
      Procedūros pavadinimas
     </label>
     <input
      type="text"
      name="name"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => setData("name", e.target.value)}
     />

     <label
      htmlForfor="duration"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
     >
      procedūros trukme
     </label>
     <select
      onChange={(e) => setData("duration", e.target.value)}
      name="duration"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     >
      <option value="0">Pasirinkite proceduros trukme (valandomis)</option>
      {Object.keys(durations).map((key) => (
       <option value={key}>{durations[key]}</option>
      ))}
     </select>
    </div>
    <SubmitButton text="Sukurti" />
   </form>
  </AdminPanelLayout>
 );
}
