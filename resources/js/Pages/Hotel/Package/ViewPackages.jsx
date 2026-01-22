import SearchInput from "@/Components/SearchInput";
import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRecycle } from "react-icons/fa6";

export default function ViewPackages({ packages, filters }) {
    return (
        <>
            <Head title="Packages" />

            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Packages
            </h2>

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                                {/* Search (optional) */}
                               <SearchInput 
                               intialValue={filters.search}
                               routeName="hotel_packages.index"
                               placeholder="Search packages..."
                               />

                                 <div className="flex gap-4 items-center">
                                <Link href={route("hotel_packages.trash")}>
                                <FaRecycle className="text-xl " />
                                </Link>
                                {/* Create Package */}
                                <Link href={route("hotel_packages.create")}>
                                    <PrimaryButton>
                                        + Create Package
                                    </PrimaryButton>
                                </Link>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Price
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Status
                                            </th>
                                            {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Hotel
                                            </th> */}
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {packages.data.length > 0 ? (
                                            packages.data.map((pkg) => (
                                                <tr
                                                    key={pkg.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        {pkg.name}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        {pkg.description}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        ${pkg.price}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                                pkg.status ===
                                                                "active"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {pkg.status}
                                                        </span>
                                                    </td>

                                                    {/* <td className="px-4 py-3 text-gray-700">
                                                        {pkg.hotels?.name ??
                                                            "N/A"}
                                                    </td> */}

                                                    {/* Actions */}
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex gap-5">
                                                            {/* Edit */}
                                                            <Link
                                                                href={route(
                                                                    "hotel_packages.edit",
                                                                    pkg.id
                                                                )}
                                                            >
                                                                <CiEdit className="text-2xl text-indigo-600" />
                                                            </Link>

                                                            {/* Delete */}
                                                            <Link
                                                                as="button"
                                                                method="delete"
                                                                href={route(
                                                                    "hotel_packages.destroy",
                                                                    pkg.id
                                                                )}
                                                                onBefore={() =>
                                                                    confirm(
                                                                        "Are you sure you want to delete this package?"
                                                                    )
                                                                }
                                                            >
                                                                <MdDelete className="text-2xl text-red-500" />
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
                            <div className="mt-6 flex justify-end gap-2">
                                {packages.links.map((link, index) => (
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
ViewPackages.layout = (page) => (
    <AuthenticatedHotelLayout header="Packages">
        {page}
    </AuthenticatedHotelLayout>
);
