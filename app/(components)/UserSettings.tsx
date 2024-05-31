import React, {ChangeEvent, FormEvent, useState} from "react";
import {
    Button,
    Input,
    VStack,
    FormControl,
    Text,
    InputField,
    Box,
    Center, ButtonIcon, AddIcon
} from "@gluestack-ui/themed";


const UserSettings = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        revenus: ""
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logique de traitement du formulaire
    };
    return (
        <Box>
            <Center>
                <FormControl size="lg" mt="$10" onSubmit={handleSubmit}>
                    <VStack>
                        <h4>Mon profil</h4>
                        <VStack>
                            <Text color={"var(--foreground-rgb)"}>Username</Text>
                            <Input
                                id="username"
                                aria-label="username">
                                <InputField
                                    color={"var(--foreground-rgb)"}
                                    onChange={handleInputChange}/>
                            </Input>
                        </VStack>
                        <VStack>
                            <Text color={"var(--foreground-rgb)"}>Email</Text>
                            <Input
                                aria-label="email"
                                id="email">
                                <InputField
                                    color={"var(--foreground-rgb)"}
                                    onChange={handleInputChange}/>
                            </Input>
                        </VStack>
                        <VStack>
                            <Text color={"var(--foreground-rgb)"}>Revenus</Text>
                            <Input
                                id="revenus">
                                <InputField color={"var(--foreground-rgb)"} onChange={handleInputChange}/>
                            </Input>
                        </VStack>
                    </VStack>
                    <Button mt="$2">
                        Update profile
                    </Button>
                    <Button mt="$4" action="negative">
                        Delete profile
                    </Button>
                </FormControl>
            </Center>
        </Box>
    )
};

export default UserSettings;