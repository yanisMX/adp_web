import {config} from "@/app/(config)/config";

export const handleSignup = async (e, formData): Promise<boolean> => {
    e.preventDefault();

    try {
        const response = await fetch(`${config.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
        });

        return response.ok;
    } catch (error) {
        console.error('Error:', error);
        return false
    }
};

export const handleLogin = async (e, formData): Promise<boolean> => {
    e.preventDefault();
    try {
        const response = await fetch(`${config.API_URL}/auth/login`, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        return response.ok;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export function getMe(){
    return fetch(`${config.API_URL}/me`, {
        credentials: 'include'
    }).then((res) => {
        return res.json();
    })
}