import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateUser({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        address: "",
        contact: "",
        dob: "",
        password: "",
        password_confirmation: "",
        role: "",
        status: "active",
        remark: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"));
    };

    return (
        <>
            <Head title="Create User" />
            
            <div className="bg-gray-100">
                <div className="mt-0 w-full rounded-lg bg-white p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide">
                        Create User Form
                    </h1>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                            </div>

                            {/* Contact */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Contact
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.contact}
                                    onChange={(e) =>
                                        setData("contact", e.target.value)
                                    }
                                />
                            </div>

                            {/* DOB */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.dob}
                                    onChange={(e) =>
                                        setData("dob", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Passwords */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Role & Status */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Role
                                </label>
                                <select
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                >
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.display_name ?? role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Status
                                </label>
                                <select
                                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Remark */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Remark
                            </label>
                            <textarea
                                rows="2"
                                className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                                value={data.remark}
                                onChange={(e) =>
                                    setData("remark", e.target.value)
                                }
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("users.index")}
                                className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton
                                disabled={processing}
                                className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                            >
                                Create User
                            </PrimaryButton>
                        </div>
                        {/* Submit
                        <PrimaryButton
                            disabled={processing}
                            className="w-full justify-center"
                        >
                            Create User
                        </PrimaryButton> */}
                    </form>
                </div>
            </div>
        </>
    );
}
/* Layout */
CreateUser.layout = (page) => (
    <AuthenticatedLayout header="Create User">
        {page}
    </AuthenticatedLayout>
);