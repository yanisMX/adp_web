import React, {useEffect} from "react";
import spendings from "@/fakedata/spendings.json";
import {Card, Heading, Text, VStack} from "@gluestack-ui/themed";
import categories from '@/fakedata/categories.json';
import {Budget, Spending} from '@/app/(models)/types';
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

const thisUser = 1;

function SpendingList() {

    const [budget, setBudget] = React.useState<Budget[]>([]);
    const [userSpendings, setUserSpendings] = React.useState<Spending[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const processBudget = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        getBudget(`${year}-${month}-${day}`).then((data) => {
            setBudget(data);
            const allSpending = data.reduce((acc, budget) => acc.concat(budget.spendings), []);
            setUserSpendings(allSpending);
        }).finally(() => {
            setIsLoading(false);
        });
        console.log("budget : " + budget)
    }

    useEffect(() => {
        processBudget();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{height: "80vh", overflow: 'scroll'}} className={"w-full h-42 no-scrollbar"}>
            <VStack>
                {userSpendings.map((spending) => (
                    <Card size={"md"} variant={"elevated"} m={"$3"} key={spending.id}>
                        <Heading mb={"$1"}>{spending.name}</Heading>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Text size={"sm"} color={"red"}>{spending.amount}€</Text>
                            <div style={{
                                backgroundColor: categoryColors[2],
                                borderRadius: "30px",
                                paddingLeft: "5px",
                                paddingRight: "5px"
                            }}>
                                <Text color="night" size={"md"}>
                                    {budget[0].name}
                                </Text>
                            </div>
                        </div>
                    </Card>
                ))}
            </VStack>
        </div>
    );
}

export default SpendingList;
