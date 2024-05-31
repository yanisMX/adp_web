import {Box} from "@gluestack-ui/themed";
import {VictoryLabel, VictoryPie} from "victory";
import React, {useEffect} from "react";
import users from "@/fakedata/users.json"
import spendings from "@/fakedata/spendings.json"
import {Budget, Spending} from "@/app/(models)/types";
import {getBudget} from "@/app/(service)/apiServiceCatSpe";
import {useMe} from "@/app/AuthenticationProvider";

export const Pie = () => {
    const me = useMe();
    const [foregroundColor, setForegroundColor] = React.useState("var(--foreground-rgb)");
    const [budget, setBudget] = React.useState<Budget[]>([]);
    const [userSpendings, setUserSpendings] = React.useState<Spending[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [pieData, setPieData] = React.useState({});
    const [totalSpending, setTotalSpending] = React.useState<number>(0);
    const [remaining, setRemaining] = React.useState<number>(0);
    const processBudget = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        getBudget(`${year}-${month}-${day}`).then((data) => {
            setBudget(data);
            const allSpending = data.reduce((acc, budget) => acc.concat(budget.spendings), []);
            setUserSpendings(allSpending);
            const totalSpendings = allSpending.reduce((acc, spending) => acc + spending.amount, 0);
            const allCategories = data.reduce((acc, budget) => acc.concat(budget.name), []);
            setTotalSpending(totalSpendings);
            const _pieData = allCategories.map((category) => {
                const totalSpending = allSpending
                    .reduce((acc, spending) => acc + spending.amount, 0);
                return {y: totalSpending}
            });
            const _remaining = me.revenue - totalSpendings;
            setRemaining(_remaining);
            _pieData.push({y: 1000});
            setPieData(_pieData);
        }).finally(() => {
            setIsLoading(false);
        });
        console.log("budget : " + budget)
    }

    useEffect(() => {
        processBudget();
    }, []);

    useEffect(() => {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--foreground-rgb');
        setForegroundColor(`rgb(${color}`);
    }, []);

    return (
        <svg viewBox="0 0 400 400" width={"400"} height={"400"}>
            <VictoryPie
                standalone={false}
                innerRadius={100}
                data={pieData}
                colorScale={[
                    "#FCFFA6",
                    "#C1FFD7",
                    "#B5DEFF",
                    "#CAB8FF",
                    "#79B4B7",
                    "#9D9D9D",
                    "#C1AC95",
                ]}
                labels={() => null}
            />
            <VictoryLabel
                textAnchor="middle"
                style={{fontSize: 20, fill: foregroundColor}}
                x={200} y={200}
                text={"Restant " + remaining + "€"}
            />
        </svg>
    );
};