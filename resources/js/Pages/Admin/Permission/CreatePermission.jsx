import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm, Link } from "@inertiajs/react";

const CreatePermission = ({ guards }) => {
    const { data, setData, post, processing, errors } = useForm({
        // name: "",
        display_name: "",
        guard_name: guards?.[0] || "web",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("permission.store"));
    };

    return (
        <>
                <h2 className="text-xl font-semibold text-slate-800">
                    Create Permission
                </h2>
            <Head title="Create Permission" />

            <div className="py-4 min-h-screen">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-md border border-slate-200">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            {/* Permission Info */}
                            <div > 
                                {/* className="grid grid-cols-1 md:grid-cols-2 gap-6" */}
                                {/* <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Permission Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="create-users"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div> */}

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Create Users"
                                        value={data.display_name}
                                        onChange={(e) =>
                                            setData(
                                                "display_name",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                    {errors.display_name && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.display_name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Guard Name Selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Guard Name
                                </label>
                                <select
                                    value={data.guard_name}
                                    onChange={(e) =>
                                        setData("guard_name", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-lg border-slate-300 bg-white focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                     <option value="">-- Select Guard --</option>
                                    <option value="web">Admin</option>
                                    <option value="staffs">Hotel</option>
                                </select>
                                {errors.guard_name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.guard_name}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
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
                                    Create Permission
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePermission;
