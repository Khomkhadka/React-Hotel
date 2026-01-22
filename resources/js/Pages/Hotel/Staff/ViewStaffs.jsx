import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import SearchInput from "@/Components/SearchInput";

export default function ViewStaffs({ staffs, filters }) {
    return (
        <>
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                All Staffs
            </h2>

            <Head title="Staffs" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                                {/* Search */}
                                <SearchInput 
                                intialValue={filters.search}
                                routeName="hotel_staffs.index"
                                placeholder="/Search Staffs"
                                />

                                {/* Create User */}
                                <Link href={route("hotel_staffs.create")}>
                                    <PrimaryButton>
                                        + Create User
                                    </PrimaryButton>
                                </Link>
                            </div>

                            {/* Users Table */}
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
                                                Role
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Address
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Contact
                                            </th>
                                            {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                DOB
                                            </th> */}
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Remark
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {staffs.data.length > 0 ? (
                                            staffs.data.map((staff) => (
                                                <tr
                                                    key={staff.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        {staff.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {staff.email}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {staff.role?.display_name ?? "N/A"}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {staff.address ?? "—"}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {staff.contact ?? "—"}
                                                    </td>
                                                    {/* <td className="px-4 py-3 text-gray-700">
                                                        {staff.dob ?? "—"}
                                                    </td> */}
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`px-2 py-1 rounded text-xs font-medium
                                                                ${
                                                                    staff.status === "active"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-red-100 text-red-700"
                                                                }
                                                            `}
                                                        >
                                                            {staff.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {staff.remake ?? "—"}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex gap-5">
                                                            {/* Edit */}
                                                            <Link
                                                                href={route(
                                                                    "hotel_staffs.edit",
                                                                    staff.id
                                                                )}
                                                            >
                                                                <CiEdit className="text-2xl text-indigo-600" />
                                                            </Link>

                                                            {/* Delete */}
                                                            <Link
                                                                as="button"
                                                                method="delete"
                                                                href={route(
                                                                    "hotel_staffs.destroy",
                                                                     staff.id
                                                                )}
                                                                onBefore={() =>
                                                                    confirm(
                                                                        "Are you sure you want to delete this user?"
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
                                                    colSpan="9"
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    No users found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-end gap-2">
                                {staffs.links.map((link, index) => (
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
ViewStaffs.layout = (page) => (
    <AuthenticatedHotelLayout header="Staffs">
        {page}
    </AuthenticatedHotelLayout>
);