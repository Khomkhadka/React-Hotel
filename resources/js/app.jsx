import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import GuestLayout from './Layouts/GuestLayout';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';
import AuthenticatedHotelLayout from './Pages/Hotel/Layouts/AuthenticatedHotelLayout';
import AuthenticatedStaffLayout from './Pages/Staff/Layouts/AuthenticatedStaffLayout';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // resolve: (name) =>
    //     resolvePageComponent(
    //         `./Pages/${name}.jsx`,
    //         import.meta.glob('./Pages/**/*.jsx'),
            
    //     ),
    resolve: async (name) => {
    const page = await resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob('./Pages/**/*.jsx'),
    );

    const pathname = window.location.pathname;

     page.default.layout ??= page =>
      pathname.startsWith('/admin') ? <AuthenticatedLayout>{page}</AuthenticatedLayout> :
      pathname.startsWith('/hotel') ? <AuthenticatedHotelLayout>{page}</AuthenticatedHotelLayout> :
      pathname.startsWith('/staff') ? <AuthenticatedStaffLayout>{page}</AuthenticatedStaffLayout> :
       page;
    return page;
},
    setup({ el, App, props }) {
        const root = createRoot(el);
    

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
