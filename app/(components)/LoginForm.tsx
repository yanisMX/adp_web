'use client';
import {useState} from "react";
import {
    Button,
    ButtonText,
    Input,
    VStack,
    FormControl,
    Heading,
    Text,
    InputField,
    Box,
    Center
} from "@gluestack-ui/themed";
import {useRouter} from "next/navigation";
import {handleLogin, handleSignup} from "@/app/(service)/apiService";


const LoginForm = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e, name) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const processLogin = async (e) => {
        if(await handleLogin(e, formData)) {
            router.push("/")
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('https://adpapi.loca.lt/auth/login', {
    //             credentials: "include",
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: formData.email,
    //                 password: formData.password
    //             })
    //         });
    //
    //         if (response.ok) {
    //             router.push("/");
    //         } else {
    //             console.error('Failed to register user');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };



    return (
        <Box>
            <Center>
                <FormControl size="lg" mt="$10" >
                    <Center><Heading color={"var(--foreground-rgb)"}>Se connecter</Heading></Center>
                    <VStack mt="$4">
                        <Text color={"var(--foreground-rgb)"}>Email</Text>
                        <Input
                            variant="underlined"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}>
                            <InputField
                                color={"var(--foreground-rgb)"}
                                id="email"
                                onChange={(e) => handleInputChange(e, "email")}
                            />
                        </Input>
                    </VStack>
                    <VStack mt="$2">
                        <Text color={"var(--foreground-rgb)"} >Mot de passe</Text>
                        <Input
                            variant="underlined"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}>
                            <InputField
                                id="password"
                                type="password"
                                onChange={(e) => handleInputChange(e, "password")}
                                color={"var(--foreground-rgb)"}
                            />
                        </Input>
                    </VStack>
                    <Button size="md"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            onPress={processLogin}
                            mt="$4">
                        <ButtonText>Se connecter</ButtonText>
                    </Button>
                </FormControl>
            </Center>
        </Box>
    )

};
export default LoginForm;
