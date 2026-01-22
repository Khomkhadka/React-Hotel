import AuthenticatedStaffLayout from "../Layouts/AuthenticatedStaffLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateCustomer({ hotelId }) {
    const { data, setData, processing, post, errors } = useForm({
        customer_name: "",
        email: "",
        customer_address: "",
        contact: "",
        dob: "",
        hotel_id: hotelId,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("staff_customers.store"));
    };

    return (
        <>
            <Head title="Create Customer" />

            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-semibold text-center mb-6">
                            Customer Form
                        </h1>

                        {/* Error Messages */}
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {Object.values(errors).map((err, index) => (
                                        <li key={index}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.customer_name}
                                        onChange={(e) =>
                                            setData(
                                                "customer_name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={data.customer_address}
                                        onChange={(e) =>
                                            setData(
                                                "customer_address",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Contact
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact}
                                        onChange={(e) =>
                                            setData("contact", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={data.dob}
                                        onChange={(e) =>
                                            setData("dob", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                        required
                                    />
                                </div>
                            </div>

                            <input type="hidden" value={hotelId} />

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <Link
                                    href={route("staff_customers.index")}
                                    className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                                >
                                    Cancel
                                </Link>

                                <PrimaryButton disabled={processing}>
                                    Create Package
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
/* Layout */
CreateCustomer.layout = (page) => (
    <AuthenticatedStaffLayout header="Customers">
        {page}
    </AuthenticatedStaffLayout>
);