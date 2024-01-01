"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevTools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProviders( {children} ){
    const [queryClient] = useState( () => new QueryClient());
    return(
        <QueryClientProvider client = {queryClient} >
            {/* <ReactQueryDevTools initalIsOpen = {false}/> */}
            {children}
        </QueryClientProvider>
    )
}