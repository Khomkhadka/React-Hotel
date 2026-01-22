import SearchInput from "@/Components/SearchInput";
import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaRecycle } from "react-icons/fa6";

export default function ViewBookings({ bookings, filters }) {
    return (
        <>
            <Head title="Bookings" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Bookings
                </h2>
            </div>

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="mb-6 flex items-center justify-between">
                                {/* Search */}
                                <SearchInput 
                                intialValue={filters.search}
                                routeName="hotel_bookings.index"
                                placeholder="/Search Bookings..."
                                />

                                 <div className="flex gap-4 items-center">
                                <Link href={route("hotel_bookings.trash")}>
                                <FaRecycle className="text-xl " />
                                </Link>
                                {/* Create Customer */}
                                <Link href={route("hotel_bookings.create")}>
                                    <PrimaryButton>
                                        + Create Booking
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
                                                Booked Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Check-in
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Check-out
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Note
                                            </th>
                                            {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hotel</th> */}
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Customer
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Package
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {bookings.data.length > 0 ? (
                                            bookings.data.map((booking) => (
                                                <tr
                                                    key={booking.id}
                                                    className="hover:bg-gray-50 transition"
                                                >
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.booked_date}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.checkin}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.checkout}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.note || "N/A"}
                                                    </td>
                                                    {/* <td className="px-4 py-3 text-gray-700">{booking.hotels?.name || <span className="text-gray-400 italic">N/A</span>}</td> */}
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.customers
                                                            ?.customer_name || (
                                                            <span className="text-gray-400 italic">
                                                                N/A
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.packages
                                                            ?.name || (
                                                            <span className="text-gray-400 italic">
                                                                N/A
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex gap-4">
                                                            <Link
                                                                href={route(
                                                                    "hotel_bookings.edit",
                                                                    booking.id,
                                                                )}
                                                            >
                                                                <CiEdit className="text-2xl text-indigo-600" />
                                                            </Link>

                                                            <Link
                                                                as="button"
                                                                method="delete"
                                                                href={route(
                                                                    "hotel_bookings.destroy",
                                                                    booking.id,
                                                                )}
                                                                onBefore={() =>
                                                                    confirm(
                                                                        "Are you sure you want to delete this booking?",
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
                                                    colSpan="8"
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
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
ViewBookings.layout = (page) => (
    <AuthenticatedHotelLayout header="Bookings">
        {page}
    </AuthenticatedHotelLayout>
);
