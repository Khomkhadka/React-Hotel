import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { logo } from "@/Assets/image";
import { FiHome, FiLogOut } from "react-icons/fi";
import {
    MdPeopleAlt,
    MdDesktopAccessDisabled,
    MdOutlineDashboard,
    MdOutlineArrowBackIosNew
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiBuilding2Line, RiMenuUnfold3Line } from "react-icons/ri";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* SIDEBAR */}
            <aside
                className={`bg-white border-r hidden md:flex flex-col transition-all duration-300
    ${collapsed ? "w-20 h-auto" : "w-64 h-auto"}`}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b">
                    <Link
                        href="/"
                        className="mb-0"
                    >
                        {!collapsed && (
                          <span className="flex items- gap-2">
                              <img src={logo} className="h-8 w-auto" />
                            <h1 className="text-xl m-2 font-semibold text-gray-800 whitespace-nowrap">
                                Admin Panel
                            </h1>
                          </span>
                        )}
                    </Link>

                    {/* Collapse Button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded hover:bg-gray-200 text-align-left"
                    >
                        {
                            !collapsed ? (<MdOutlineArrowBackIosNew className="rotate-180 text-xl"/> 
                            ) : <RiMenuUnfold3Line className="text-2xl" />
                        }
                        
                    </button>
                </div>

                <nav className="grid grid-rows-1 px-4 py-6 space-y-2">
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        <MdOutlineDashboard className="text-2xl text-center" />
                        {!collapsed && <span>Dashboard</span>}
                    </NavLink>

                    <NavLink
                        href={route("role.index")}
                        active={route().current("role")}
                    >
                        <MdPeopleAlt className="text-2xl" />
                        {!collapsed && <span>Roles</span>}
                    </NavLink>

                    <NavLink
                        href={route("permission.index")}
                        active={route().current("permission")}
                    >
                        <MdDesktopAccessDisabled className="text-2xl" />
                        {!collapsed && <span>Permissions</span>}
                    </NavLink>
                    {/* <NavLink>
                        <FaRegUser  className="text-2xl" />
                    </NavLink>
                    <NavLink>
                        <RiBuilding2Line  className="text-2xl" />
                    </NavLink> */}
                </nav>

                <div className="mt-auto p-4 border-t">
                    <Link href={route("logout")} method="post" as="button" className="flex items-center space-x-2 text-red-600 hover:text-red-800">
                        <FiLogOut  className="text-2xl" />
                        {!collapsed && <span>Logout</span>}
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">
                {/* TOP BAR */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                    <div className="text-lg font-semibold text-gray-800">
                        {header}
                    </div>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                                {user.name}
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>

                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
