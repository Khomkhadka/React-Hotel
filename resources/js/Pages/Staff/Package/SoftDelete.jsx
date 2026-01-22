import SearchInput from "@/Components/SearchInput";
import AuthenticatedStaffLayout from "../Layouts/AuthenticatedStaffLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";

export default function SoftDelete({ packages, filters }) {
    return (
        <>
            <Head title="Packages" />
                  <h2 className="text-xl font-semibold text-gray-800">
                                    View Packages
                                </h2>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                              <h1 className="text-2xl">Recycle</h1>


                                <Link href={route("staff_packages.index")}>
                                    <PrimaryButton>
                                        Back
                                    </PrimaryButton>
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto border border-gray-200 shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Package Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Price
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Status
                                            </th>
                                            {/* <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Hotel
                                            </th> */}
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {packages.data.length > 0 ? (
                                            packages.data.map((pkg) => (
                                                <tr
                                                    key={pkg.id}
                                                    className="hover:bg-gray-50 transition"
                                                >
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        {pkg.name}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        {pkg.description}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        ${Number(pkg.price).toFixed(2)}
                                                    </td>

                                                    <td className="px-4 py-3 capitalize">
                                                        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium">
                                                            {pkg.status}
                                                        </span>
                                                    </td>

                                                    {/* <td className="px-4 py-3 text-gray-700">
                                                        {pkg.hotels?.name || (
                                                            <span className="text-gray-400 italic">
                                                                N/A
                                                            </span>
                                                        )}
                                                    </td> */}

                                                    {/* Actions */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-3">
                                                            <Link
                                                                href={route(
                                                                    "staff_packages.restore",
                                                                    pkg.id
                                                                )}
                                                            >
                                                                <MdOutlineRestore className="text-xl text-indigo-600 hover:scale-110 transition" />
                                                            </Link>

                                                          
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    No packages found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {packages.links && (
                                <div className="mt-6 flex justify-end gap-2">
                                    {packages.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1 text-sm rounded-md border ${
                                                link.active
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                            } ${!link.url && "text-gray-400 cursor-not-allowed"}`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* Layout */
SoftDelete.layout = (page) => (
    <AuthenticatedStaffLayout header="Packages">
        {page}
    </AuthenticatedStaffLayout>
);
