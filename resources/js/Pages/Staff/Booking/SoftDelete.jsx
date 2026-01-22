import SearchInput from "@/Components/SearchInput";
import AuthenticatedStaffLayout from "../Layouts/AuthenticatedStaffLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";

export default function SoftDelete({ bookings, filters }) {
    return (
        <>
            <Head title="Bookings" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                             <h1 className="text-2xl">Recycle</h1>

                                <Link href={route("staff_bookings.index")}>
                                    <PrimaryButton>
                                       Back
                                    </PrimaryButton>
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Booked Date</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Check-in</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Check-out</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Note</th>
                                            {/* <th className="px-4 py-3 text-left font-semibold text-gray-600">Hotel</th> */}
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Customer</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Package</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {bookings.data.length > 0 ? (
                                            bookings.data.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3">{booking.booked_date}</td>
                                                    <td className="px-4 py-3">{booking.checkin}</td>
                                                    <td className="px-4 py-3">{booking.checkout}</td>
                                                    <td className="px-4 py-3">{booking.note || "N/A"}</td>

                                                    {/* <td className="px-4 py-3">
                                                        {booking.hotels?.name || (
                                                            <span className="text-gray-400 italic">N/A</span>
                                                        )}
                                                    </td> */}

                                                    <td className="px-4 py-3">
                                                        {booking.customers?.customer_name || (
                                                            <span className="text-gray-400 italic">N/A</span>
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        {booking.packages?.name || (
                                                            <span className="text-gray-400 italic">N/A</span>
                                                        )}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-3">
                                                            <Link href={route("staff_bookings.restore", booking.id)}>
                                                                <MdOutlineRestore className="text-xl text-indigo-600 hover:scale-110 transition" />
                                                            </Link>

    
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                                                    No bookings found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {bookings.links && (
                                <div className="mt-6 flex justify-end gap-2">
                                    {bookings.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1 text-sm rounded-md border ${
                                                link.active
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                            } ${!link.url && "text-gray-400 cursor-not-allowed"}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
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
    <AuthenticatedStaffLayout header="All Bookings">
        {page}
    </AuthenticatedStaffLayout>
);
