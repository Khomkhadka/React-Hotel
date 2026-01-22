import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome | Hotel Management System" />

            <div className="min-h-screen bg-gray-50 flex flex-col">

                {/* Header */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-black">
                            Hotel Management System
                        </h1>

                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 hover:text-indigo-600 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 rounded-md bg-black text-white hover:bg-indigo-700 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="flex-1 flex items-center">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                                Smart Hotel <br /> Management Made Easy
                            </h2>

                            <p className="mt-6 text-lg text-gray-600">
                                Manage customers, bookings, staff, and hotel operations
                                efficiently from one powerful dashboard.
                            </p>

                            <div className="mt-8 flex gap-4">
                                <Link
                                    href={auth.user ? route('dashboard') : route('login')}
                                    className="px-6 py-3 bg-black text-white rounded-md hover:bg-indigo-700 transition"
                                >
                                    Get Started
                                </Link>

                                <Link
                                    href="#features"
                                    className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                                alt="Hotel"
                                className="rounded-lg shadow-lg h-[420px] w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h3 className="text-3xl font-bold text-center text-gray-800">
                            Platform Features
                        </h3>

                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                            <Feature
                                title="Customer Management"
                                description="Centralized customer records with quick access."
                            />
                            <Feature
                                title="Booking & Reservations"
                                description="Track room bookings and availability in real-time."
                            />
                            <Feature
                                title="Staff & Roles"
                                description="Manage staff access with role-based permissions."
                            />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-6 text-center">
                    © {new Date().getFullYear()} Hotel Management System. All rights reserved.
                </footer>

            </div>
        </>
    );
}

function Feature({ title, description }) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h4 className="text-xl font-semibold text-gray-800">
                {title}
            </h4>
            <p className="mt-3 text-gray-600">
                {description}
            </p>
        </div>
    );
}
