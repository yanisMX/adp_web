'use client';
import React, {createContext, useEffect, useState} from "react";
import {Container} from "@/app/(components)/Container";

import {Center} from "@gluestack-ui/themed";
import {AuthenticationProvider} from "@/app/AuthenticationProvider";

export default function Home() {
    return (
        <AuthenticationProvider whileLoading={<h1>Loading...</h1>}>
            <main style={{padding: "30px"}}>
                <Center>
                    <Container/>
                </Center>
            </main>
        </AuthenticationProvider>
    );
}
