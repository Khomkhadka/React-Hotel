import AuthenticatedStaffLayout from "../Layouts/AuthenticatedStaffLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function EditPackage({ package: pkg, hotelId }) {
    const { data, setData, put, processing, errors } = useForm({
        name: pkg.name || "",
        price: pkg.price || "",
        status: pkg.status || "active",
        description: pkg.description || "",
        hotel_id: hotelId,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("staff_packages.update", pkg.id));
    };

    return (
        <>
            <Head title="Package" />

            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Package
                </h2>
            </div>

            <div className="bg-gray-100 min-h-screen">
                <div className="w-full rounded-xl bg-white p-8 shadow-lg border border-slate-200">
                    <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-slate-800">
                        Edit Package
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Name, Price, Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Package Name
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
                                    Price
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                />
                                {errors.price && (
                                    <p className="text-sm text-red-600">
                                        {errors.price}
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
                                        setData("status", e.target.value)
                                    }
                                    className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                rows="3"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href={route("staff_packages.index")}
                                className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton disabled={processing}>
                                Update Package
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

EditPackage.layout = (page) => (
    <AuthenticatedStaffLayout header="Package">
        {page}
    </AuthenticatedStaffLayout>
);
