import React, {createContext, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {useRouter} from "next/navigation";
import {getMe} from "@/app/(service)/apiService";

const AuthenticationContext = createContext({});

export function AuthenticationProvider({children, whileLoading}: { children: any, whileLoading: any }) {
    const cookies = new Cookies().get("sessionToken");
    const router = useRouter();
    const [me, setMe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        if (!cookies) {
            router.push("/login");
        } else {
            getMe().then((data) => {
                setMe(data);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, []);

    if (isLoading) {
        return whileLoading;
    }

    return (
        <AuthenticationContext.Provider value={me}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export function useMe() {
    return React.useContext(AuthenticationContext);
}