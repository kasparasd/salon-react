import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function RegisterToProcedure4({
 auth,
 procedure,
 employee,
 time,
 date,
}) {
 const { post } = useForm({
  date: date,
  time: time,
 });

 const onSubmit = (e) => {
  e.preventDefault();
  post(route("procedures.register-5", {'procedure': procedure, 'employee': employee}));
 };
 return (
  <AuthenticatedLayout
   user={auth.user}
   header={
    <div className="flex justify-between items-center flex-wrap">
     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Pasirinkta paslauga: {procedure.name}, Specialistas: {employee.name}
     </h2>
    </div>
   }
  >
   <Head title="Registruotis procedūrai" />
   <div className="dark:bg-gray-800 overflow-hidden sm:rounded-lg">
    <div className="p-1 text-gray-900 dark:text-gray-100">
     <div className="overflow-auto">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 flex flex-col items-center justify-center">
         <form onSubmit={onSubmit}>
          <div className="p-6 text-gray-900">
           <h1>Pasirinkote procedura: {procedure.name} </h1>
           <p>Pasirinkite specialista: {employee.name}</p>
           <label htmlFor="date">
            <p>Data: {date}</p>
           </label>
           <label htmlFor="time">
            <p>Laikas: {time}</p>
           </label>
           <button type="submit">Patvirtinti</button>
          </div>
         </form>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </AuthenticatedLayout>
 );
}
