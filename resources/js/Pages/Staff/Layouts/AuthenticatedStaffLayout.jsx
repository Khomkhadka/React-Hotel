import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, router, usePage } from "@inertiajs/react";
import { logo } from "@/Assets/image";
import { FiHome, FiLogOut } from "react-icons/fi";
import {
    MdPeopleAlt,
    MdDesktopAccessDisabled,
    MdOutlineDashboard,
    MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiBuilding2Line, RiMenuUnfold3Line } from "react-icons/ri";
import { useState } from "react";
import { GoChecklist } from "react-icons/go";
import { LuPackageCheck } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa6";
import Can from "@/Components/Can";

export default function AuthenticatedStaffLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [collapsed, setCollapsed] = useState(false);

    const handlelogout = () => {
       
        console.log("Logging out...");
        router.delete(route("staff_destroy.logout"));
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* SIDEBAR */}
            <aside
                className={`bg-white border md:flex flex-col transition-all duration-300
    ${collapsed ? "w-20 h-auto" : "w-64 h-auto"}`}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b">
                    <Link href="/" className="mb-0">
                        {!collapsed && (
                            <span className="flex items pd-3">
                                <img src={logo} className="h-8 w-auto" />
                                <h1 className="text-xl m-2 font-semibold text-gray-800 whitespace-nowrap">
                                    Staff Panel
                                </h1>
                            </span>
                        )}
                    </Link>

                    {/* Collapse Button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded hover:bg-gray-200 text-align-left"
                    >
                        {!collapsed ? (
                            <MdOutlineArrowBackIosNew className="text-xl" />
                        ) : (
                            <RiMenuUnfold3Line className="text-2xl" />
                        )}
                    </button>
                </div>

                <nav className="grid grid-rows-1 px-6 py-6 space-y-2">
                    <NavLink
                        href={route("staff_dashboard")}
                        active={route().current("staff_dashboard")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <MdOutlineDashboard className="text-2xl text-center" />
                        {!collapsed && <span className="text-xl">Dashboard</span>}
                    </NavLink>

                    <Can permission='view-package'>
                        <NavLink
                    href={route("staff_packages.index")}
                        active={route().current("staff_packages.*")}
                        className="align-baseline gap-2 mb-0">
                        <LuPackageCheck className="text-2xl" />
                         {!collapsed && <span className="text-xl">Packages</span>}
                    </NavLink>
                    </Can>

                  <Can permission="view-customer">
                      <NavLink
                    href={route("staff_customers.index")}
                        active={route().current("staff_customers.*")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <FaRegUser className="text-2xl" />
                         {!collapsed && <span className="text-xl">Customers</span>}
                    </NavLink>
                  </Can>
                    <Can permission='view-booking'>
                        <NavLink
                    href={route("staff_bookings.index")}
                        active={route().current("staff_bookings.*")}
                        className="align-baseline gap-2 mb-0">
                        <GoChecklist className="text-2xl" />
                         {!collapsed && <span className="text-xl">Bookings</span>}
                    </NavLink>
                    </Can>
                </nav>

                <div className="mt-auto p-4 border-t">
                    <Link
                        onClick={handlelogout}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                    >
                        <FiLogOut className="text-2xl" />
                        {!collapsed && <span>Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">
                {/* TOP BAR */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                    <div className="text-lg font-semibold text-gray-800">
                        {header ?? null}
                    </div>

                    <div className="flex gap-3 items-center ">
                        <p className="text-xl">{user.name}</p>
                        <Link
                            // href={route("staff_profile.edit")}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-semibold text-sm hover:bg-indigo-700 transition"
                        >
                            {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}
                        </Link>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
