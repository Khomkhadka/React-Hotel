import PrimaryButton from '@/Components/PrimaryButton';

import { Head } from '@inertiajs/react';
import AuthenticatedHotelLayout from './Layouts/AuthenticatedHotelLayout';

export default function Dashboard({customers,bookings,staffs}) {
    return (
        <>
            
              <Head title="Hotel Dashboard" />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Top Cards */}
                <div className="flex justify-evenly">

                    {/* Total Customers */}
                    <div className="bg-white shadow rounded-lg p-6 w-[22rem] flex flex-col items-center justify-center">
                        <h3 className="text-xl font-medium text-gray-600">
                            Total Customers
                        </h3>
                        <p className="text-5xl font-bold text-gray-800 mt-4">
                            {customers.data.length}
                        </p>
                    </div>

                    {/* Total Bookings */}
                    <div className="bg-white shadow rounded-lg p-6 w-[22rem] flex flex-col items-center justify-center">
                        <h3 className="text-xl font-medium text-gray-600">
                            Total Bookings
                        </h3>
                        <p className="text-5xl font-bold text-gray-800 mt-4">
                            {bookings.length}
                        </p>
                    </div>

                    {/* Total Staffs */}
                    <div className="bg-white shadow rounded-lg p-6 w-[22rem] flex flex-col items-center justify-center">
                        <h3 className="text-xl font-medium text-gray-600">
                            Total Staffs
                        </h3>
                        <p className="text-5xl font-bold text-gray-800 mt-4">
                            {staffs.length}
                        </p>
                    </div>

                </div>

                {/* Recent Customers Table */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Recent Customers
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {customers.data.length > 0 ? (
                                    customers.data.map((customer, idx) => (
                                        <tr key={customer.id ?? idx}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {idx + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {customer.customer_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {customer.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {customer.contact}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {customer.customer_address}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            No customers found.
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
/* Layout */
Dashboard.layout = (page) => (
    <AuthenticatedHotelLayout header="Dashboard">
        {page}
    </AuthenticatedHotelLayout>
);
