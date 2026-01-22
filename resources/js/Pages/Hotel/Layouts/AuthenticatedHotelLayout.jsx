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
import FlashToast from "@/Components/FlashToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthenticatedHotelLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        console.log("Logging out...");
        router.delete(route("hotel_destroy.logout"));
    };
    // console.log(window.innerWidth)
    // if(window.innerWidth < 768 && !collapsed){
    //     setCollapsed(true);
    // }

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
                                    Hotel Panel
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
                        href={route("hotel_dashboard")}
                        active={route().current("hotel_dashboard")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <MdOutlineDashboard className="text-2xl text-center" />
                        {!collapsed && (
                            <span className="text-xl">Dashboard</span>
                        )}
                    </NavLink>

                    <NavLink
                        href={route("hotel_roles.index")}
                        active={route().current("hotel_roles.*")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <MdPeopleAlt className="text-2xl" />
                        {!collapsed && <span className="text-xl">Roles</span>}
                    </NavLink>

                    <NavLink
                        href={route("hotel_permissions.index")}
                        active={route().current("hotel_permissions.*")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <MdDesktopAccessDisabled className="text-2xl" />
                        {!collapsed && (
                            <span className="text-xl">Permissions</span>
                        )}
                    </NavLink>
                    <NavLink
                        href={route("hotel_staffs.index")}
                        active={route().current("hotel_staffs.*")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <FaUserTie className="text-2xl" />
                        {!collapsed && <span className="text-xl">Staffs</span>}
                    </NavLink>
                    <NavLink
                        href={route("hotel_packages.index")}
                        active={route().current("hotel_packages.*")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <LuPackageCheck className="text-2xl" />
                        {!collapsed && (
                            <span className="text-xl">Packages</span>
                        )}
                    </NavLink>

                    <NavLink
                        href={route("hotel_customers.index")}
                        active={route().current("hotel_customers.*")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <FaRegUser className="text-2xl" />
                        {!collapsed && (
                            <span className="text-xl">Customers</span>
                        )}
                    </NavLink>
                    <NavLink
                        href={route("hotel_bookings.index")}
                        active={route().current("booking.*")}
                        className="align-baseline gap-2 mb-0"
                    >
                        <GoChecklist className="text-2xl" />
                        {!collapsed && (
                            <span className="text-xl">Bookings</span>
                        )}
                    </NavLink>
                </nav>

                <div className="mt-auto p-4 border-t">
                    <Link
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                    >
                        <FiLogOut className="text-2xl" />
                        {!collapsed && <span>Logouts</span>}
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
                            href={route("hotel_profile.edit")}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-semibold text-sm hover:bg-indigo-700 transition"
                        >
                            {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}
                        </Link>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-6">
                    {children}
                    {/* Toast (mounted once) */}
                    <FlashToast />
                    <ToastContainer position="top-right" autoClose={3000} />
                </main>
            </div>
        </div>
    );
}
