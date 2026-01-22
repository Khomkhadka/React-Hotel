import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function EditUser({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        contact: user.contact || "",
        dob: user.dob || "",
        password: "",
        password_confirmation: "",
        role: user.role?.name || "",
        status: user.status || "active",
        remark: user.remark || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <>
            <Head title="Edit User" />

            {/* Header */}
            <div className="mb-6 flex justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit User
                </h2>

                <Link
                    href={route("users.index")}
                    className="rounded-md bg-slate-700 px-3 py-2 text-sm text-white"
                >
                    Back
                </Link>
            </div>

            <div className="min-h-screen bg-gray-100">
                <div className="w-full rounded-lg bg-white p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide">
                        Edit User Form
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
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Leave blank to keep current"
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
                                        <option
                                            key={role.id}
                                            value={role.name}
                                        >
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

                        {/* Submit */}
                        <PrimaryButton
                            disabled={processing}
                            className="w-full justify-center"
                        >
                            Update User
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </>
    );
}
/* Layout */
EditUser.layout = (page) => (
    <AuthenticatedLayout header="Edit User">
        {page}
    </AuthenticatedLayout>
);
