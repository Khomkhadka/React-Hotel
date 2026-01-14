import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function ViewPermissions({ permissions, filters }) {
    const [activeTab, setActiveTab] = useState("web");
    const filteredPermissions = permissions.data.filter(
        (permission) => permission.guard_name === activeTab
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Permissions
                </h2>
            }
        >
            <Head title="permissions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                                {/* Add permission */}
                                <Link href={route("permission.create")}>
                                    <PrimaryButton>
                                        + Add Permission
                                    </PrimaryButton>
                                </Link>

                                {/* Search */}
                                <input
                                    type="text"
                                    placeholder="Search roles..."
                                    defaultValue={filters?.search || ""}
                                    className="w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Design-based navbar */}
                            <div className="mb-6 flex gap-6 border-b">
                                <button
                                    onClick={() => setActiveTab("web")}
                                    className={`pb-2 text-sm font-semibold transition
            ${
                activeTab === "web"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-indigo-600"
            }
        `}
                                >
                                    Admin Permissions
                                </button>

                                <button
                                    onClick={() => setActiveTab("staffs")}
                                    className={`pb-2 text-sm font-semibold transition
            ${
                activeTab === "staffs"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-indigo-600"
            }
        `}
                                >
                                    Hotel Permissions
                                </button>
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
                                        {filteredPermissions.length > 0 ? (
                                            filteredPermissions.map(
                                                (permission, index) => (
                                                    <tr
                                                        key={permission.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">
                                                            {permission.name}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-600">
                                                            {new Date(
                                                                permission.created_at
                                                            ).toLocaleDateString()}
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
        </AuthenticatedLayout>
    );
}
