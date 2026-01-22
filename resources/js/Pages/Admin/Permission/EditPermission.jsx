import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm, Link } from "@inertiajs/react";

const EditPermission = ({ permission }) => {
    const { data, setData, put, processing, errors } = useForm({
        display_name: permission.display_name || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("permission.update", permission.id));
    };

    return (
        <>
            <Head title="Edit Permission" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">
                    Edit Permission
                </h2>

                <Link
                    href={route("permission.index")}
                    className="bg-slate-700 text-sm rounded-md text-white px-3 py-2"
                >
                    Back
                </Link>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-md border border-slate-200">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            {/* Permission Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={data.display_name}
                                    onChange={(e) =>
                                        setData("display_name", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="Enter permission"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.display_name}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end">
                                <Link
                                    href={route("permission.index")}
                                    className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    disabled={processing}
                                    className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                                >
                                    Update
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPermission;
