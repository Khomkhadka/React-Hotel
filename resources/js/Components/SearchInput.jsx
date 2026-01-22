import {useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";

const SearchInput = ({
    intialValue = "",
    routeName,
    delay = 300,
    extraParams = {},
    ...props
}) => {
    const [search, setSearch] = useState(intialValue);
    const firstLoad = useRef(true);

    useEffect(() =>{
        if(firstLoad.current){
            firstLoad.current = false;
            return;
        }

        const timeout = setTimeout(() =>{
            
                router.get(
                    route(routeName),
                    {search, page:1, ...extraParams },
                    {preserveState: true, replace:true}
                );
            
        }, delay);

        return () => clearTimeout(timeout);
    }, [search]);

    return(
        <input
            className="w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            {...props}
            />
    );
};

export default SearchInput;