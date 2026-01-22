import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { customStyles } from "@/functions/Helper";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function EditBooking({ booking, customers, packages, hotelId }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: booking.customer_id || "",
        package_id: booking.package_id || "",
        booked_date: booking.booked_date || "",
        checkin: booking.checkin || "",
        checkout: booking.checkout || "",
        note: booking.note || "",
        hotel_id: hotelId,
    });


    const packageOptions = packages.map((p) => ({
        value: p.id,
        label: p.name,
    }));
    const customerOptions = customers.map((c) => ({
        value: c.id,
        label: c.customer_name,
    }));

    const submit = (e) => {
        e.preventDefault();
        put(route("hotel_bookings.update", booking.id));
    };

    return (
        <>
            <Head title="Edit Booking" />

            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Booking
                </h2>

                <Link
                    href={route("hotel_bookings.index")}
                    className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                    Back
                </Link>
            </div>

            <div className="bg-gray-100 min-h-screen">
                <div className="w-full rounded-xl bg-white p-8 shadow-lg border border-slate-200">
                    <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-slate-800">
                        Booking Form
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Customer + Package */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Customer
                                </label>
                                {/* <select
                                    value={data.customer_id}
                                    onChange={(e) =>
                                        setData("customer_id", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.customer_name}
                                        </option>
                                    ))}

                                </select> */}
                                <Select
                                    options={customerOptions}
                                    styles={customStyles}
                                    placeholder="Select Customer"
                                    value={customerOptions.find(
                                        (opt) => opt.value === data.customer_id,
                                    )}
                                    onChange={(selected) =>
                                        setData("customer_id", selected.value)
                                    }
                                />

                                {errors.customer_id && (
                                    <p className="text-sm text-red-600">
                                        {errors.customer_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Package
                                </label>
                                {/* <select
                                    value={data.package_id}
                                    onChange={(e) =>
                                        setData("package_id", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                >
                                    <option value="">Select Package</option>
                                    {packages.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                            
                                </select> */}
                                <Select
                                    options={packageOptions}
                                    styles={customStyles}
                                    placeholder="Select Package"
                                    value={packageOptions.find(
                                        (opt) => opt.value === data.package_id,
                                    )}
                                    onChange={(selected) =>
                                        setData("package_id", selected.value)
                                    }
                                />

                                {errors.package_id && (
                                    <p className="text-sm text-red-600">
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
                                        setData("booked_date", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Check-in Date
                                </label>
                                <input
                                    type="date"
                                    value={data.checkin}
                                    onChange={(e) =>
                                        setData("checkin", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Check-out Date
                                </label>
                                <input
                                    type="date"
                                    value={data.checkout}
                                    onChange={(e) =>
                                        setData("checkout", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
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
                                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                            />
                            {errors.note && (
                                <p className="text-sm text-red-600">
                                    {errors.note}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("hotel_bookings.index")}
                                className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton disabled={processing}>
                                Update Booking
                            </PrimaryButton>
                        </div>

                        {/* Error Box */}
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-50 text-red-700 p-4 rounded">
                                <ul className="list-disc list-inside text-sm">
                                    {Object.values(errors).map((err, i) => (
                                        <li key={i}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

/* Layout */
EditBooking.layout = (page) => (
    <AuthenticatedHotelLayout header="Bookings">
        {page}
    </AuthenticatedHotelLayout>
);
