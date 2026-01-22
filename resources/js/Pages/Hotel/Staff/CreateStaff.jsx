import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateStaff({ hotelId }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        address: "",
        contact: "",
        status: "active",
        password: "",
        password_confirmation: "",
        remake: "",
        hotel_id: hotelId,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("hotel_staffs.store"));
    };

    return (
        <>
            <Head title="Create Staff" />

            <div className="bg-gray-100">
                <div className="w-full rounded-xl bg-white p-8 shadow-lg border border-slate-200">
                    <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-slate-800">
                        Create Staff Form
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Staff Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
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
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Contact */}
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
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                            </div>

                            

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Passwords */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        {/* Remark */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Remark
                            </label>
                            <textarea
                                rows="2"
                                value={data.remake}
                                onChange={(e) =>
                                    setData("remake", e.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("hotel_staffs.index")}
                                className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                            >
                                Create Staff
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
CreateStaff.layout = (page) => (
    <AuthenticatedHotelLayout header="Create Staff">
        {page}
    </AuthenticatedHotelLayout>
);
