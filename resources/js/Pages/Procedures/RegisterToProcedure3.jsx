import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function RegisterToProcedure2({
 auth,
 procedure,
 employee,
 times,
}) {
 useEffect(() => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/flatpickr";
  script.async = true;
  script.onload = () => {
   initializeFlatpickr();
  };
  document.body.appendChild(script);

  return () => {
   document.head.removeChild(link);
   document.body.removeChild(script);
  };
 }, []);

 const initializeFlatpickr = () => {
  const slotsDOM = document.querySelector("#timeSlots");

  const setTime = (time) => {
   const timeInput = document.getElementById("time-input");
   timeInput.value = time;
  };

  const fetchTimes = (date) => {
   fetch(
    `http://127.0.0.1:8000/get-occupied-times?procedure=${procedure.id}&employee=${employee.id}&date=${date}`
   )
    .then((response) => {
     if (response.ok) {
      return response.json();
     }

     throw new Error("Request failed.");
    })
    .then((data) => {
     setTime("");
     renderTimeSlots(data);
    })
    .catch((error) => console.error(error));
  };

  const renderTimeSlots = (times) => {
   slotsDOM.textContent = "";

   for (const [time, i] of Object.entries(times)) {
    const div = document.createElement("div");
    div.textContent = time;
    if (i === "occupied") {
     div.setAttribute(
      "class",
      "border border-gray-300 p-2 pr-4 time-slot taken bg-red-200"
     );
    } else if (i === "good") {
     div.setAttribute(
      "class",
      "border border-gray-300 p-2 pr-4 time-slot bg-green-100"
     );
     div.setAttribute("style", "cursor: pointer");
    }
    div.setAttribute("id", time);
    slotsDOM.appendChild(div);
   }
  };

  slotsDOM.addEventListener("click", (e) => {
   const classes = e.target.classList;
   const timeSlots = document.querySelectorAll(".time-slot");

   if (![...classes].includes("taken") && [...classes].includes("time-slot")) {
    if ([...classes].includes("bg-green-100")) {
     const value = e.target.id;
     timeSlots.forEach((element) => {
      if (![...element.classList].includes("taken")) {
       element.classList.remove("bg-green-500");
       element.classList.add("bg-green-100");
      }
     });
     classes.add("bg-green-500");
     classes.remove("bg-green-100");
     setTime(value);
    } else {
     setTime("");
     classes.add("bg-green-100");
     classes.remove("bg-green-500");
    }
   }
  });

  flatpickr("#datepicker", {
   inline: true,
   defaultDate: "today",
   onReady: (selectedDates, dateStr) => {
    fetchTimes(dateStr);
   },
   onChange: (selectedDates, dateStr) => {
    fetchTimes(dateStr);
   },
  });
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
         <h1>Pasirinkite laika</h1>
         <form
          action={`registerToProcedure4?procedure=${procedure.id}&employee=${employee.id}`}
         >
          <div className="flex">
           <div className="w-3/4">
            <h2>Kalendorius</h2>
            <input type="hidden" id="datepicker" name="date" required />
           </div>
           <div>
            <h2>Laikų lentele</h2>
            <input type="text" name="time" required id="time-input" readOnly />
            <div id="timeSlots" className="grid grid-cols-5 gap-1"></div>
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
