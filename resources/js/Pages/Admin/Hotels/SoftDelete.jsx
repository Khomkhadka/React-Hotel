import PrimaryButton from "@/Components/PrimaryButton";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";

export default function SoftDelete({ hotels, filters }) {
    return (
        <>
            <Head title="Hotels" />

            

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                               <h1 className="text-xl"> Recycle</h1>
                                {/* <SearchInput 
                                intialValue={filters.search}
                                routeName="hotels.index"
                                placeholder="/Search Hotels..."
                                /> */}

                                {/* Create Hotel */}
                                <Link href={route("hotels.index")}>
                                    <PrimaryButton>
                                         Back
                                    </PrimaryButton>
                                </Link>
                                
                            </div>

                            {/* Hotels Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Email
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Type
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Address
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Contact
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {hotels.data.length > 0 ? (
                                            hotels.data.map((hotel) => (
                                                <tr
                                                    key={hotel.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        {hotel.name}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        {hotel.email}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        {hotel.type}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        {hotel.address}
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        {hotel.contact}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                                hotel.status === "active"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {hotel.status}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex gap-5">
                                                            {/* Edit */}
                                                            <Link
                                                                href={route(
                                                                    "hotels.restore",
                                                                    hotel.id
                                                                )}
                                                            >
                                                                <MdOutlineRestore className="text-2xl text-indigo-600" />
                                                            </Link>

                                                            {/* Delete */}
                                                            <Link
                                                                as="button"
                                                                method="delete"
                                                                href={route(
                                                                    "hotels.forceDelete",
                                                                    hotel.id
                                                                )}
                                                                onBefore={() =>
                                                                    confirm(
                                                                        "Are you sure you want to delete this hotel?"
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
                                                    colSpan="7"
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    No hotels found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-end gap-2">
                                {hotels.links.map((link, index) => (
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
SoftDelete.layout = (page) => (
    <AuthenticatedLayout header="Hotels">
        {page}
    </AuthenticatedLayout>
);
