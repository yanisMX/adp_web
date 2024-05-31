import React from 'react';
import { useRouter } from 'next/navigation'
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
import {handleSignup} from "@/app/(service)/apiService";
import Link from "next/link";



const SignupForm = () => {
   const router = useRouter()

    const [formData , setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });

   const processSignup = async (e) => {
       if(await handleSignup(e, formData)) {
           router.push("/login")
       }
    }

    const handleInputChange = (e, name) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBlur = (fieldName) => {
        const inputValue = formData[fieldName];
        if (inputValue.length < 3) {
            alert(`Le mot de passe et le nom d'utilisateur doivent comporter plus de 3 caractères!`);
        }
    };



    return (
        <Box>
            <Center>
                <FormControl size="md" mt="$10" >
                    <Center><Heading color={"var(--foreground-rgb)"} >S'inscrire</Heading></Center>
                    <VStack mt="$4">
                        <Text color={"var(--foreground-rgb)"}>Nom</Text>
                        <Input
                            variant="underlined"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}>
                            <InputField
                                color={"var(--foreground-rgb)"}
                                id="username"
                                onChange={(e) => handleInputChange(e, 'username')}
                                onBlur={() => handleBlur('username')}
                                value={formData.username}/>
                        </Input>
                    </VStack>
                    <VStack mt="$2">
                        <Text color={"var(--foreground-rgb)"} >Email</Text>
                        <Input
                            variant="underlined"
                            size="md"

                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}
                        >
                            <InputField id="email"
                                   value={formData.email}
                                   onChange={(e) => handleInputChange(e, "email")}
                                   color={"var(--foreground-rgb)"}/>
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
                            <InputField id="password"
                                        value={formData.password || ''}
                                        onChange={(e) => handleInputChange(e, "password")}
                                        color={"var(--foreground-rgb)"}
                                        onBlur={() => handleBlur('password')}
                            type={"password"}/>
                        </Input>
                    </VStack>
                    <VStack mt="$2">
                        <Text color={"var(--foreground-rgb)"} >Confirmez votre mot de passe</Text>
                        <Input
                            variant="underlined"
                            size="md"
                            isDisabled={false}
                            isInvalid={false}
                            isReadOnly={false}>
                            <InputField
                                id="confirm_password"
                                value={formData.confirm_password || ''}
                                onChange={(e) => handleInputChange(e, "confirm_password")}
                                color={"var(--foreground-rgb)"}
                                type={"password"}/>
                        </Input>
                    </VStack >
                    <Box mt="$2">
                        <Link color="#007bff" href={`/login`}>
                            Déjà un compte ? Connectez-vous !
                        </Link>
                    </Box>
                    <Button size="md"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            mt="$4"
                            onPress={processSignup}>
                        <ButtonText>S'inscrire</ButtonText>
                    </Button>
                </FormControl>
            </Center>
        </Box>
    );
};

export default SignupForm;
