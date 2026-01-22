import AuthenticatedStaffLayout from "../Layouts/AuthenticatedStaffLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateBooking({ customers, packages, hotelId }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: "",
        package_id: "",
        booked_date: "",
        checkin: "",
        checkout: "",
        note: "",
        hotel_id: hotelId,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("staff_bookings.store"));
    };

    return (
        <>
            <Head title="Create Booking" />
            <h2 className="text-xl font-semibold text-gray-800">
                Create Booking
            </h2>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Form Card */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
                                    Booking Form
                                </h1>

                                <form onSubmit={submit} className="space-y-6">
                                    {/* Customer + Package */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Customer
                                            </label>
                                            <select
                                                value={data.customer_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "customer_id",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-black"
                                            >
                                                <option value="">
                                                    Select Customer
                                                </option>
                                                {customers.map((c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.customer_name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.customer_id && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.customer_id}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Package
                                            </label>
                                            <select
                                                value={data.package_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "package_id",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-black"
                                            >
                                                <option value="">
                                                    Select Package
                                                </option>
                                                {packages.map((p) => (
                                                    <option
                                                        key={p.id}
                                                        value={p.id}
                                                    >
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.package_id && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.package_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Booked Date
                                            </label>
                                            <input
                                                type="date"
                                                value={data.booked_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "booked_date",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-black"
                                            />
                                            {errors.booked_date && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.booked_date}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Check-in
                                            </label>
                                            <input
                                                type="date"
                                                value={data.checkin}
                                                onChange={(e) =>
                                                    setData(
                                                        "checkin",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-black"
                                            />
                                            {errors.checkin && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.checkin}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Check-out
                                            </label>
                                            <input
                                                type="date"
                                                value={data.checkout}
                                                onChange={(e) =>
                                                    setData(
                                                        "checkout",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-black"
                                            />
                                            {errors.checkout && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.checkout}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Note */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Note
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={data.note}
                                            onChange={(e) =>
                                                setData("note", e.target.value)
                                            }
                                            className="w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-black"
                                        />
                                        {errors.note && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.note}
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-3">
                                        <Link
                                            href={route("staff_bookings.index")}
                                            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </Link>

                                        <PrimaryButton disabled={processing}>
                                            Create Booking
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* Layout */
CreateBooking.layout = (page) => (
    <AuthenticatedStaffLayout header="Booking">{page}</AuthenticatedStaffLayout>
);
