import SearchInput from "@/Components/SearchInput";
import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRecycle } from "react-icons/fa6";

export default function ViewCustomers({ customers, filters }) {
    return (
        <>
            <Head title="Customers" />

            <h2 className="text-xl font-semibold leading-tight text-gray-800 mb-6">
                All Customers
            </h2>

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                                {/* Search */}
                                <SearchInput
                                intialValue={filters.search}
                                routeName="hotel_customers.index"
                                placeholder="/Search Customers..."
                                />

                                  <div className="flex gap-4 items-center">
                                <Link href={route("hotel_customers.trash")}>
                                <FaRecycle className="text-xl " />
                                </Link>
                                {/* Create Customer */}
                                <Link href={route("hotel_customers.create")}>
                                    <PrimaryButton>
                                        + Create Customer
                                    </PrimaryButton>
                                </Link>
                                </div>
                            </div>

                            {/* Customers Table */}
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
                                                Address
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Contact
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                DOB
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {customers.data.length > 0 ? (
                                            customers.data.map((customer) => (
                                                <tr key={customer.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-medium text-gray-800">
                                                        {customer.customer_name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {customer.email}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {customer.customer_address}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {customer.contact}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {customer.dob}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3 flex gap-3">
                                                        <Link
                                                            href={route(
                                                                "hotel_customers.edit",
                                                                customer.id
                                                            )}
                                                            className="flex items-center justify-center"
                                                        >
                                                            <CiEdit className="text-2xl text-indigo-600" />
                                                        </Link>

                                                        <Link
                                                            as="button"
                                                            method="delete"
                                                            href={route(
                                                                "hotel_customers.destroy",
                                                                customer.id
                                                            )}
                                                            onBefore={() =>
                                                                confirm(
                                                                    "Are you sure you want to delete this customer?"
                                                                )
                                                            }
                                                            className="flex items-center justify-center"
                                                        >
                                                            <MdDelete className="text-2xl text-red-500" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
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
                            <div className="mt-6 flex justify-end gap-2">
                                {customers.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? ""}
                                        className={`px-3 py-1 text-sm rounded-md border
                                            ${
                                                link.active
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                            }
                                            ${!link.url && "text-gray-400 cursor-not-allowed"}
                                        `}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
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
ViewCustomers.layout = (page) => (
    <AuthenticatedHotelLayout header="Customers">
        {page}
    </AuthenticatedHotelLayout>
);
