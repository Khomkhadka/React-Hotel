import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function EditCustomer({ customers }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_name: customers.customer_name || "",
        email: customers.email || "",
        customer_address: customers.customer_address || "",
        contact: customers.contact || "",
        dob: customers.dob || "",
        hotel_id: customers.hotel_id || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("hotel_customers.update", customers.id));
    };

    return (
        <>
            <Head title="Edit Customer" />

            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Customer
                </h2>
                <Link
                    href={route("hotel_customers.index")}
                    className="px-3 py-2 bg-slate-700 text-white text-sm rounded-md hover:bg-slate-800"
                >
                    Back
                </Link>
            </div>

            <div className="bg-gray-100 min-h-screen py-6">
                <div className="mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                    <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-slate-800">
                        Customer Form
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Name, Email, Address, Contact, DOB */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    value={data.customer_name}
                                    onChange={(e) =>
                                        setData("customer_name", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                    required
                                />
                                {errors.customer_name && (
                                    <p className="text-sm text-red-600">
                                        {errors.customer_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={data.customer_address}
                                    onChange={(e) =>
                                        setData("customer_address", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                    required
                                />
                                {errors.customer_address && (
                                    <p className="text-sm text-red-600">
                                        {errors.customer_address}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Contact
                                </label>
                                <input
                                    type="text"
                                    value={data.contact}
                                    onChange={(e) => setData("contact", e.target.value)}
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                    required
                                />
                                {errors.contact && (
                                    <p className="text-sm text-red-600">{errors.contact}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={data.dob}
                                    onChange={(e) => setData("dob", e.target.value)}
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                    required
                                />
                                {errors.dob && (
                                    <p className="text-sm text-red-600">{errors.dob}</p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("hotel_customers.index")}
                                className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton disabled={processing}>
                                Update Customer
                            </PrimaryButton>
                        </div>

                        {/* General Error Box */}
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
EditCustomer.layout = (page) => (
    <AuthenticatedHotelLayout header="Customer">{page}</AuthenticatedHotelLayout>
);
