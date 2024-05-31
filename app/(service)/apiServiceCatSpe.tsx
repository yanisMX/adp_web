import {Budget} from "@/app/(models)/types";
import {config} from "@/app/(config)/config";

export const postCategory = async (name: string, budget: number) => {
    return await fetch(`${config.API_URL}/budget/category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            budget
        }),
        credentials: 'include'
    }).then((res) => {
        return res.ok;
    });

}

export const getBudget = async (dateString: string): Promise<Budget[]> => {
    return await fetch(`${config.API_URL}/budget?` + new URLSearchParams({
        date: dateString
    }), {
        credentials: 'include'
    }).then((res) => {
        return res.json();
    })
}

export const putSpending = async (name: string, categoryID: string, recurrent: boolean, amount: number) => {
    return await fetch(`${config.API_URL}/budget/category/${categoryID}/spending`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount,
            name,
            recurrent
        }),
        credentials: 'include'
    }).then((res) => {
        return res.ok;
    });
}