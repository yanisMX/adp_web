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
import {getBudget, putSpending} from "@/app/(service)/apiServiceCatSpe";



const AddSpendings = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        category: '',
        amount: 0,
        recurrent: false
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

    const handleCheckboxChange = (e) => {
        const {checked} = e.target;
        setFormData({
            ...formData,
            recurrent: checked
        });
    }

    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            category: value
        });
    }

    const processAddSpending = async () => {
        console.log(formData);
        if(await putSpending(formData.name, formData.category, formData.recurrent, formData.amount)) {
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
                {/*Category*/}
                <Box px="$3">
                    <FormControlLabel>
                        <FormControlLabelText color={"var(--foreground-rgb)"}>Category</FormControlLabelText>
                    </FormControlLabel>
                    <Select
                        onValueChange={handleSelectChange}
                    >
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput
                                placeholder="Categorie"
                            />
                            <SelectIcon mr="$3">
                                <Icon as={ChevronDownIcon}/>
                            </SelectIcon>
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop/>
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator/>
                                </SelectDragIndicatorWrapper>
                                {categories.map((category) => (
                                    <SelectItem label={category.name} value={category.id}/>
                                ))}
                            </SelectContent>
                        </SelectPortal>
                    </Select>
                </Box>

                {/*Recurrence*/}
                <Box px="$3">
                    <FormControlLabel>
                        <FormControlLabelText color={"var(--foreground-rgb)"}>Recurrence</FormControlLabelText>
                    </FormControlLabel>

                    <Checkbox
                        size="lg"
                        pb="$0"
                        isInvalid={false}
                        isDisabled={false}
                        onChange={handleCheckboxChange}>
                        <CheckboxIndicator mr="$2">
                            <CheckboxIcon as={CheckIcon}/>
                        </CheckboxIndicator>
                        <CheckboxLabel>Mensuelle</CheckboxLabel>
                    </Checkbox>
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
                    onPress={processAddSpending}
                >
                    <ButtonIcon as={AddIcon}/>
                </Button>
            </FormControl>

        </Box>
    )
};

export default AddSpendings;