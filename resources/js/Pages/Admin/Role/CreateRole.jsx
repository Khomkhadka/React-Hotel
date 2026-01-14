import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { Head, useForm, Link } from '@inertiajs/react'

const CreateRole = ({ permissions }) => {
    const [search, setSearch] = useState('')

    const { data, setData, post, processing, errors } = useForm({
        display_name: '',
        guard_name: 'web',
        permissions: [],
    })

    const togglePermission = (id) => {
        setData(
            'permissions',
            data.permissions.includes(id)
                ? data.permissions.filter(p => p !== id)
                : [...data.permissions, id]
        )
    }

    const filteredPermissions = permissions.filter(permission =>
        permission.name.toLowerCase().includes(search.toLowerCase())
    )

    const submit = (e) => {
        e.preventDefault()
        post(route('role.store'))
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-slate-800">
                    Create Role
                </h2>
            }
        >
            <Head title="Create Role" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-md border border-slate-200">

                        <form onSubmit={submit} className="p-6 space-y-6">

                            {/* Role Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Role Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        placeholder="admin"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div> */}

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.display_name}
                                        onChange={e => setData('display_name', e.target.value)}
                                        className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        placeholder="Administrator"
                                    />
                                    {errors.display_name && (
                                        <p className="text-sm text-red-500 mt-1">{errors.display_name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Hidden Guard */}
                            <input type="hidden" value="web" />

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
                                        onChange={e => setSearch(e.target.value)}
                                        className="w-64 rounded-md border-slate-300 bg-white focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>

                                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto">
                                    {filteredPermissions.length ? (
                                        filteredPermissions.map(permission => (
                                            <label
                                                key={permission.id}
                                                className="flex items-center gap-2 p-2 rounded-md border border-slate-200 hover:bg-emerald-50 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.permissions.includes(permission.id)}
                                                    onChange={() => togglePermission(permission.id)}
                                                    className="rounded text-emerald-600 focus:ring-emerald-500"
                                                />
                                                <span className="text-sm text-slate-700">
                                                    {permission.name}
                                                </span>
                                            </label>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 text-sm col-span-full">
                                            No permissions found.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <Link
                                    href={route("role.index")}
                                    className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                                >
                                    Cancel
                                </Link>

                                <PrimaryButton
                                    disabled={processing}
                                    className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                                >
                                    Create Role
                                </PrimaryButton>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default CreateRole
