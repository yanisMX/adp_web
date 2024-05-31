import React, {useEffect} from 'react'
import {VStack} from "@gluestack-ui/themed";
import categories from '@/fakedata/categories.json'
import spendings from '@/fakedata/spendings.json'
import users from '@/fakedata/users.json'
import {toFixedNumber} from "@react-stately/utils";
import {useMe} from "@/app/AuthenticationProvider";
import {Budget, Spending} from "@/app/(models)/types";
import {getBudget} from "@/app/(service)/apiServiceCatSpe";

const categoryColors = [
    "#FCFFA6",
    "#C1FFD7",
    "#B5DEFF",
    "#CAB8FF",
    "#79B4B7",
    "#9D9D9D",
    "#C1AC95",
];

export default function Keys() {
    const me = useMe();
    const [foregroundColor, setForegroundColor] = React.useState("var(--foreground-rgb)");
    const [budget, setBudget] = React.useState<Budget[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const processBudget = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        getBudget(`${year}-${month}-${day}`).then((data) => {
            setBudget(data);
        }).finally(() => {
            setIsLoading(false);
        });
        console.log("budget : " + budget)
    }

    useEffect(() => {
        processBudget();
    }, []);

    return (
        <VStack>
            {budget.map((category, i: number) => {
                const percentage = me.revenue ? (category.budget / me.revenue * 100).toFixed(2) : 0;
                return (
                    <div key={category.id} style={{display: "inline-flex", alignItems: "center", marginBottom: "10px"}}>
                        <div style={{
                            backgroundColor: categoryColors[i],
                            width: 20,
                            height: 20,
                            marginRight: 10,
                            borderRadius: "50%"
                        }}></div>
                        <span style={{marginRight: 30}}>{category.name}</span>
                        <span>{percentage}% ({toFixedNumber(category.totalSpending, 2)}€)</span>
                    </div>
                );
            })}
        </VStack>
    );
}