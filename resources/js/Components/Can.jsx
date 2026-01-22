import { usePage } from "@inertiajs/react";

export default function Can({ permission, children }) {
    const { auth } = usePage().props;

    console.log(auth.permissions);
    // If permissions are missing or user doesn’t have it → nothing renders
    if (!auth?.permissions?.includes(permission)) {
        return null;
    }

    return children;
}