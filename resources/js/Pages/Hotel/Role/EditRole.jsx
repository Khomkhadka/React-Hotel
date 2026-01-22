import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedHotelLayout from "../Layouts/AuthenticatedHotelLayout";

export default function EditRole  ({ role, permissions, hasPermissions })  {
    const [search, setSearch] = useState("");

    const { data, setData, put, processing, errors } = useForm({
        display_name: role.display_name || role.name,
        guard_name: "staffs",
        permissions: hasPermissions || [],
    });

    const togglePermission = (name) => {
        setData(
            "permissions",
            data.permissions.includes(name)
                ? data.permissions.filter((p) => p !== name)
                : [...data.permissions, name]
        );
    };

    // 🔍 Filter permissions
    const filteredPermissions = permissions.filter((permission) =>
        permission.name.toLowerCase().includes(search.toLowerCase())
    );

    //  Group permissions by prefix
    const groupedPermissions = filteredPermissions.reduce(
        (groups, permission) => {
            const groupName = permission.name.split(".")[0];
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(permission);
            return groups;
        },
        {}
    );

    const submit = (e) => {
        e.preventDefault();
        put(route("hotel_roles.update", role.id));
    };

    return (
        <>
            <Head title="Edit Role" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">
                    Edit Role
                </h2>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-md border border-slate-200">
                        <form onSubmit={submit} className="p-6 space-y-6">
                            {/* Role Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={data.display_name}
                                    onChange={(e) =>
                                        setData("display_name", e.target.value)
                                    }
                                    className="mt-1 w-full md:w-1/2 rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder="Enter role"
                                />
                                {errors.display_name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.display_name}
                                    </p>
                                )}
                            </div>

                            {/* Permissions */}
                            <div className="border rounded-lg border-slate-200">
                                <div className="flex items-center justify-between p-4 bg-slate-100 rounded-t-lg">
                                    <h3 className="font-semibold text-slate-700">
                                        Assign Permissions
                                    </h3>

                                    <input
                                        type="text"
                                        placeholder="Search permissions..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-64 rounded-md border-slate-300 bg-white focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>

                                <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
                                    {Object.keys(groupedPermissions).length ? (
                                        Object.entries(groupedPermissions).map(
                                            ([group, perms]) => (
                                                <div key={group}>
                                                    <h4 className="mb-3 text-sm font-semibold uppercase text-slate-600 border-b pb-1">
                                                        {group}
                                                    </h4>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                        {perms.map(
                                                            (permission) => (
                                                                <label
                                                                    key={
                                                                        permission.name
                                                                    }
                                                                    className="flex items-center gap-2 p-2 rounded-md border border-slate-200 hover:bg-emerald-50 cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={data.permissions.includes(
                                                                            permission.name
                                                                        )}
                                                                        onChange={() =>
                                                                            togglePermission(
                                                                                permission.name
                                                                            )
                                                                        }
                                                                        className="rounded text-emerald-600 focus:ring-emerald-500"
                                                                    />
                                                                    <span className="text-sm text-slate-700">
                                                                        {
                                                                            permission.display_name
                                                                        }
                                                                    </span>
                                                                </label>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p className="text-slate-500 text-sm">
                                            No permissions found.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end">
                                <Link
                                    href={route("hotel_roles.index")}
                                    className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    disabled={processing}
                                    className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                                >
                                    Update Role
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
/* Layout */
EditRole.layout = (page) => (
    <AuthenticatedHotelLayout header="Role">
        {page}
    </AuthenticatedHotelLayout>
);

