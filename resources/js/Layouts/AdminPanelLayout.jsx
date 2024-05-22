import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function AdminPanelLayout({ auth, children, user, header }) {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
 };

 return (
  <AuthenticatedLayout user={user}>
   <Head title="TEST" />
   <div className="bg-white">
    <button
     onClick={toggleSidebar}
     type="button"
     className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
     <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
     >
      <path
       clipRule="evenodd"
       fillRule="evenodd"
       d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
     </svg>
    </button>
   </div>

   <div className="flex h-screen bg-white">
    <aside
     id="logo-sidebar"
     className={`fixed left-0 top-0 z-40 h-full transition-transform duration-300 lg:relative lg:translate-x-0 ${
      isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
     } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
     aria-label="Sidebar"
    >
     <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
      <button
       onClick={toggleSidebar}
       type="button"
       className="absolute top-2 right-2 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
       <span className="sr-only">Close sidebar</span>
       <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
       >
        <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        ></path>
       </svg>
      </button>
      <ul className="space-y-2 font-medium mt-10">
       <li>
        <Link
         href={route("user.index")}
         className="ms-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
         Vartotojai
        </Link>
        <Link
         href={route("roles.index")}
         className="ms-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
         Roles
        </Link>
        <Link
         href={route("procedures.index")}
         className="ms-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
         Proceduros
        </Link>
       </li>
      </ul>
     </div>
    </aside>

    <main className="flex-1 p-4 overflow-x-auto transition-all duration-300">
     {header && (
      <header className="bg-white shadow">
       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {header}
       </div>
      </header>
     )}
     {children}
    </main>
   </div>
  </AuthenticatedLayout>
 );
}
