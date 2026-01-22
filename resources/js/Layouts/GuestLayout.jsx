import AuthenticatedLayout from "./AuthenticatedLayout";
export default function GuestLayout({ children }) {
    return (
        <>
            {/* <AuthenticatedLayout/> */}

            <div>
                {children}
            </div>

            <footer>Footer</footer>
        </>
    );
}
