import { useForm } from "@inertiajs/react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function EditHotel ({ hotels }){
    const { data, setData, put, processing, errors } = useForm({
        name: hotels.name || "",
        email: hotels.email || "",
        address: hotels.address || "",
        contact: hotels.contact || "",
        type: hotels.type || "",
        status: hotels.status || "active",
        remark: hotels.remark || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("hotels.update", hotels.id));
    };

    return (
        <>
            <Head title="Edit Hotel" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Edit Hotel
                                </h2>
                                <Link href={route("hotels.index")}>
                                    <PrimaryButton>Back</PrimaryButton>
                                </Link>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Hotel Name</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData("name", e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData("email", e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={e => setData("address", e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Contact</label>
                                        <input
                                            type="text"
                                            value={data.contact}
                                            onChange={e => setData("contact", e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Type</label>
                                        <select
                                            value={data.type}
                                            onChange={e => setData("type", e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Hotel">Hotel</option>
                                            <option value="Restaurant">Restaurant</option>
                                        </select>
                                        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Status</label>
                                        <select
                                            value={data.status}
                                            onChange={e => setData("status", e.target.value)}
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Remark */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Remark</label>
                                    <textarea
                                        value={data.remark}
                                        onChange={e => setData("remark", e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        rows="2"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Update Hotel
                                    </PrimaryButton>
                                </div>

                                {/* Error Box */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="mt-4 bg-red-50 text-red-700 p-3 rounded">
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
                </div>
            </div>
        </>
    );
}
/* Layout */
EditHotel.layout = (page) => (
    <AuthenticatedLayout header="Edit Hotel">{page}</AuthenticatedLayout>
);



