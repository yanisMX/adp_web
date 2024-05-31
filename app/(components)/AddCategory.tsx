import React, {useEffect} from 'react';
import {
    AddIcon,
    Box,
    Button,
    ButtonIcon,
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
    CheckIcon,
    ChevronDownIcon,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Icon,
    Input,
    InputField,
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger
} from "@gluestack-ui/themed";
import {getBudget, postCategory, putSpending} from "@/app/(service)/apiServiceCatSpe";



const AddCategory = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        amount: 0
    });
    const [categories, setCategories] = React.useState([]);

    const handleInputChange = (e, name) => {
        const {value} = e.target;
        console.log("salut");
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const processAddCategory = async () => {
        console.log(formData);
        if(await postCategory(formData.name, formData.amount)) {
            location.reload()
        }
    }

    useEffect(() => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        getBudget(`${year}-${month}-${day}`).then((data) => {
            setCategories(data);
        });
    }, []);

    return (
        <Box>
            <FormControl display="flex" flexDirection="row" alignItems="center">
                {/*Name input*/}
                <Box px="$3">
                    <FormControlLabel>
                        <FormControlLabelText color={"var(--foreground-rgb)"}>Nom</FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        width="30vh"
                        variant="outline"
                        size="md"
                        color={"black"}>
                        <InputField
                            color={"var(--foreground-rgb)"}
                            placeholder="Nom"
                            onChange={(e) => handleInputChange(e, "name")}/>
                    </Input>
                </Box>

                {/*Amount input*/}
                <Box>
                    <FormControlLabel>
                        <FormControlLabelText color={"var(--foreground-rgb)"}>Montant</FormControlLabelText>
                    </FormControlLabel>
                    <Input
                        width="30vh"
                        variant="outline"
                        size="md"
                        color={"black"}>
                        <InputField
                            color={"var(--foreground-rgb)"}
                            placeholder="Montant"
                            onChange={(e) => handleInputChange(e, "amount")}
                        />
                    </Input>
                </Box>

                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    mt="23px"
                    mx="$3"
                    isDisabled={false}
                    isFocusVisible={false}
                    bg={"gray"}
                    onPress={processAddCategory}
                >
                    <ButtonIcon as={AddIcon}/>
                </Button>
            </FormControl>

        </Box>
    )
};

export default AddCategory;