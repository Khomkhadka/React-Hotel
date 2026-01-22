import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { GoEye } from "react-icons/go";
import { IoEyeOffOutline } from "react-icons/io5";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-center mb-6 tracking-wide">
                        Login
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                autoFocus
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                    required
                                />

                                {/* Show / Hide Icon */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-black"
                                >
                                    {/* 🔁 REPLACE THIS WITH YOUR OWN ICON */}
                                    {showPassword ? <IoEyeOffOutline /> : <GoEye/>}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-black focus:ring-black"
                                />
                                <span>Remember me</span>
                            </label>

                            <Link
                                href={route("password.request")}
                                className="text-sm text-black hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                        >
                            Login
                        </button>

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
        </>
    );
}
