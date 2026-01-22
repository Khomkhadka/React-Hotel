import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({hotels,users}) {
    return (
        <>
                     
          
        
            <Head title="Dashboard" />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Top Cards */}
                <div className="flex justify-evenly">

                    {/* Total Hotels Card */}
                    <div className="bg-white shadow rounded-lg p-6 w-[32rem] flex flex-col items-center justify-center">
                        <h3 className="text-xl font-medium text-gray-600">
                            Total Hotels
                        </h3>
                        <p className="text-5xl font-bold text-gray-800 mt-4">
                            {hotels.length}
                        </p>
                    </div>

                    {/* Total Admin Users Card */}
                    <div className="bg-white shadow rounded-lg p-6 w-[32rem] flex flex-col items-center justify-center">
                        <h3 className="text-xl font-medium text-gray-600">
                            Total Admin Users
                        </h3>
                        <p className="text-5xl font-bold text-gray-800 mt-4">
                            {users.length}
                        </p>
                    </div>

                </div>

                {/* Recently Added Hotels Table */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Recently Added Hotels
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {hotels.length > 0 ? (
                                    hotels.map((hotel, idx) => (
                                        <tr key={hotel.id ?? idx}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {idx + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {hotel.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {hotel.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {new Date(hotel.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                            No hotels found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}
Dashboard.layout = (page) => (
    <AuthenticatedLayout header="Dashboard">{page}</AuthenticatedLayout>
);

