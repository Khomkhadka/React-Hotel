import Can from "@/Components/Can";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchInput from "@/Components/SearchInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

export default function ViewRoles({ roles, filters }) {
    return (
        <>
           
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Roles Management
                </h2>
           
        
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header Actions */}
                            <div className="mb-5 flex items-center justify-between">
                                
                                {/* Search */}
                                <SearchInput 
                                intialValue={filters.search}
                                routeName="role.index"
                                placeholder="/Search Roles..."
                                />

                               <Can permission='create-role'>
                                 {/* Add Role */}
                                <Link href={route("role.create")}>
                                    <PrimaryButton>+ Add Role</PrimaryButton>
                                </Link>
                               </Can>
                            </div>

                            {/* Roles Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                S.N
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Role
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Permissions
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                                Created At
                                            </th>
                                            <th className="px-4 py-3 md:w-56 text-left text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {roles.data.length > 0 ? (
                                            roles.data.map((role, index) => (
                                                <tr
                                                    key={role.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {(roles.current_page -
                                                            1) *
                                                            roles.per_page +
                                                            index +
                                                            1}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                                                        {role.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-800">                                                     
                                                        {role.permissions.map(perm => perm.name).join(', ')}                                                                                                        
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {new Date(
                                                            role.created_at
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    {/* Actions */}
                                                    <td className="px-4 py-3 text-sm">
                                                        <div className="flex gap-5 mr-0">
                                                           <Can permission='edit-role'>
                                                             {/* Edit */}
                                                            <Link
                                                                href={route("role.edit",
                                                                    role.id)}
                                                                // className="rounded-md bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700"
                                                            >
                                                               < CiEdit className="text-3xl text-[#4F46E5]"/>
                                                            </Link>
                                                           </Can>

                                                            <Can permission='delete-role'>
                                                                {/* Delete */}
                                                            <Link
                                                                as="button"
                                                                method="delete"
                                                                href={route("role.destroy",
                                                                    role.id)}
                                                                // className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                                                onBefore={() =>
                                                                    confirm(
                                                                        "Are you sure you want to delete this role?"
                                                                    )
                                                                }
                                                            >
                                                                <TiDeleteOutline className="text-2xl text-red-500" />
                                                            </Link>
                                                            </Can>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="px-4 py-6 text-center text-gray-500"
                                                >
                                                    No roles found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex justify-end gap-2">
                                {roles.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? ""}
                                        className={`px-3 py-1 text-sm rounded-md border
                                            ${
                                                link.active
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                            }
                                            ${
                                                !link.url &&
                                                "text-gray-400 cursor-not-allowed"
                                            }
                                        `}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
/* Layout */
ViewRoles.layout = (page) => (
    <AuthenticatedLayout header="Role">
        {page}
    </AuthenticatedLayout>
);