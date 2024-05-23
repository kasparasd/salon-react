import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function RegisterToProcedure2({ auth, procedure, employee }) {
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
         <h1>Pasirinkite laika</h1>
         <form action="{{route('procedures-register-4', ['procedure' => $procedure->id, 'employee' => $employee->id])}}">
          <div class="flex">
           <div class="w-3/4">
            <h2>Kalendorius</h2>
            <input type="hidden" id="datepicker" name="date" required />
           </div>
           <div class="">
            <h2>Laikų lentele</h2>
            <input type="text" name="time" required id="time-input" readonly />
            <div id="timeSlots" class="grid grid-cols-5 gap-1"></div>
           </div>
          </div>

          <button type="submit">Pasirinkti</button>
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
