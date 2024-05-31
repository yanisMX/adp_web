export interface UserSignup {
    username: string,
    email: string,
    password: string,
    confirm_password: string,
}

export interface UserLogin {
    email: string,
    password: string
}

export interface User {
     ID : string,
     fullname :  string,
     email :  string,
     password :  string,
     revenus :  string
}

export interface Budget {
    id: string;
    name: string;
    budget: number;
    spendings: Spending[];
    totalSpending: number;
    usedBudget: number;
}

export interface Spending {
    ID: number,
    name: string,
    amount: string,
    recurrent: boolean,
}