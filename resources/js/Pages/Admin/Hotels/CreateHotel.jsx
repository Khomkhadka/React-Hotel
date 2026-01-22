import { useForm } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CreateHotel() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        address: "",
        contact: "",
        type: "",
        password: "",
        password_confirmation: "",
        status: "active",
        remark: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("hotels.store"));
    };

    return (
        <>
            <Head title="Create Hotel" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Create Hotel
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Hotel Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm">
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
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-sm">
                                                {errors.address}
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
                                            onChange={(e) =>
                                                setData(
                                                    "contact",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.contact && (
                                            <p className="text-red-500 text-sm">
                                                {errors.contact}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Type
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">
                                                Select Type
                                            </option>
                                            <option value="Hotel">Hotel</option>
                                            <option value="Restaurant">
                                                Restaurant
                                            </option>
                                        </select>
                                        {errors.type && (
                                            <p className="text-red-500 text-sm">
                                                {errors.type}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="active">
                                                Active
                                            </option>
                                            <option value="inactive">
                                                Inactive
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-sm">
                                                {errors.password}
                                            </p>
                                        )}
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
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Remark */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Remark
                                    </label>
                                    <textarea
                                        value={data.remark}
                                        onChange={(e) =>
                                            setData("remark", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        rows="2"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route("permission.index")}
                                        className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Create Hotel
                                    </PrimaryButton>
                                </div>

                                {/* Error Box */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="mt-4 bg-red-50 text-red-700 p-3 rounded">
                                        <ul className="list-disc list-inside text-sm">
                                            {Object.values(errors).map(
                                                (err, i) => (
                                                    <li key={i}>{err}</li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* Layout */
CreateHotel.layout = (page) => (
    <AuthenticatedLayout header="Create Hotel">{page}</AuthenticatedLayout>
);
