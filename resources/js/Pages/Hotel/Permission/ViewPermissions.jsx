import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import SearchInput from "@/Components/SearchInput";

export default function ViewPermissions({ permissions, filters }) {
    // const [activeTab, setActiveTab] = useState("web");
    // const filteredPermissions = permissions.data.filter(
    //     (permission) => permission.guard_name === activeTab
    // );
    

    return (
        <>
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Permissions
                </h2>
            
            <Head title="permissions" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">

                                {/* Search */}
                               <SearchInput 
                               intialValue={filters.search}
                               routeName='hotel_permissions.index'
                               placeholder="Search Permissions..."
                               />
                            </div>

                            {/* permission Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                S.N
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Permission Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Created At
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {permissions.data.length > 0 ? (
                                            permissions.data.map(   
                                                (permission, index) => (
                                                    <tr
                                                        key={permission.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">
                                                            {permission.display_name}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    No roles found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-end gap-2">
                                {permissions.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? ""}
                                        className={`px-3 py-1 text-sm rounded-md border
                                            ${
                                                link.active
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                            }
                                            ${
                                                !link.url &&
                                                "text-gray-400 cursor-not-allowed"
                                            }
                                        `}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* Layout */
ViewPermissions.layout = (page) => (
    <AuthenticatedHotelLayout header='Permissions'>
        {page}
    </AuthenticatedHotelLayout>
);
