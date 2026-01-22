import SearchInput from "@/Components/SearchInput";
import AuthenticatedStaffLayout from "../Layouts/AuthenticatedStaffLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRecycle } from "react-icons/fa6";
import Can from "@/Components/Can";

export default function ViewCustomers({ customers, filters }) {
    return (
        <>
            <Head title="Customers" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                                <SearchInput
                                    intialValue={filters.search}
                                    routeName="staff_customers.index"
                                    placeholder="Search Customers..."
                                />

                                <div className="flex gap-4 items-center">
                                    <Can permission='delete-customer'>
                                        <Link href={route("staff_customers.trash")}>
                                        <FaRecycle className="text-xl " />
                                    </Link>
                                    </Can>
                                    <Can permission='create-customer'>
                                        <Link
                                        href={route("staff_customers.create")}
                                    >
                                        <PrimaryButton>
                                            + Create Customer
                                        </PrimaryButton>
                                    </Link>
                                    </Can>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                                Email
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                                Address
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                                Contact
                                            </th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                                DOB
                                            </th>
                                            {/* <th className="px-4 py-3 text-left font-semibold text-gray-600">Hotel</th> */}
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {customers.data.length > 0 ? (
                                            customers.data.map((customer) => (
                                                <tr
                                                    key={customer.id}
                                                    className="hover:bg-gray-50 transition"
                                                >
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        {customer.customer_name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {customer.email}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {
                                                            customer.customer_address
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {customer.contact}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {customer.dob}
                                                    </td>

                                                    {/* <td className="px-4 py-3 text-gray-700">
                                                        {customer.hotels?.name || (
                                                            <span className="text-gray-400 italic">
                                                                N/A
                                                            </span>
                                                        )}
                                                    </td> */}

                                                    {/* Actions */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-3">
                                                           <Can permission='edit-customer'>
                                                             <Link
                                                                href={route(
                                                                    "staff_customers.edit",
                                                                    customer.id,
                                                                )}
                                                            >
                                                                <CiEdit className="text-xl text-indigo-600 hover:scale-110 transition" />
                                                            </Link>
                                                           </Can>

                                                            <Can permission='delete-customer'>
                                                                <Link
                                                                as="button"
                                                                method="delete"
                                                                href={route(
                                                                    "staff_customers.destroy",
                                                                    customer.id,
                                                                )}
                                                                onBefore={() =>
                                                                    confirm(
                                                                        "Are you sure you want to delete this customer?",
                                                                    )
                                                                }
                                                            >
                                                                <MdDelete className="text-xl text-red-500 hover:scale-110 transition" />
                                                            </Link>
                                                            </Can>
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
                                                    No customers found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {customers.links && (
                                <div className="mt-6 flex justify-end gap-2">
                                    {customers.links.map((link, index) => (
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
ViewCustomers.layout = (page) => (
    <AuthenticatedStaffLayout header="All Customers">
        {page}
    </AuthenticatedStaffLayout>
);
