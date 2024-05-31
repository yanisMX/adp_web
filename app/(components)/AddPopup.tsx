import {
    Box,
    Button,
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent, ButtonIcon, AddIcon
} from "@gluestack-ui/themed";
import AddSpendings from "@/app/(components)/AddSpendings";
import React from "react";


const AddPopup = () => {

    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)
    return (

        <Box >
            <Button onPress={handleClose} w="8vh" style={{borderRadius: "999px"}} bg={"gray"} ml={"auto"} >
                <ButtonIcon as={AddIcon} />
            </Button>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999
            } >
                <ActionsheetBackdrop/>
                    <ActionsheetContent h="100px" >
                        <AddSpendings/>
                    </ActionsheetContent>
            </Actionsheet>
        </Box>
    )
};

export default AddPopup;