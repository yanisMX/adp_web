import React from 'react'
import {
    BadgeIcon,
    Button,
    Center,
    Icon,
    Menu as GluestackMenu,
    MenuIcon,
    MenuItem,
    Image,
    MenuItemLabel, ButtonText, ActionsheetBackdrop, ActionsheetContent, Actionsheet
} from "@gluestack-ui/themed";
import hamburgere from '@/public/hamburgere.svg'
import {useRouter} from "next/navigation";
import Cookies from "universal-cookie";
import AddSpendings from "@/app/(components)/AddSpendings";
import AddCategory from "@/app/(components)/AddCategory";

export default function Menu() {
    const router = useRouter();
    const [showActionsheet, setShowActionsheet] = React.useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)

    function logout(){
        const cookies = new Cookies();
        cookies.remove("sessionToken");
        router.push("/login");
    }

    return (
        <Center>
            <div style={{width: "20%"}}>
                <GluestackMenu
                    placement={"top"}
                    trigger={({...triggerProps}) => {
                        return (
                            <Button {...triggerProps} bg={"gray"} py="$2.5" action="secondary">
                                <ButtonText fontSize="$sm" fontWeight="$medium">
                                    Menu
                                </ButtonText>
                            </Button>
                        )
                    }}
                >
                    <MenuItem key={"category"} textValue={"category"} onPress={handleClose}>
                        <Icon as={BadgeIcon}></Icon>
                        <MenuItemLabel size={"sm"}>Ajouter Catégories</MenuItemLabel>
                    </MenuItem>
                    <MenuItem key={"Profil"} textValue={"Profil"} href={"/user-settings"}>
                        <Icon as={BadgeIcon}></Icon>
                        <MenuItemLabel size={"sm"}>Profil</MenuItemLabel>
                    </MenuItem>
                    <MenuItem key={"logout"} textValue={"logout"} onPress={logout}>
                        <Icon as={BadgeIcon}></Icon>
                        <MenuItemLabel size={"sm"}>Se déconnecter</MenuItemLabel>
                    </MenuItem>
                </GluestackMenu>
                <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999
                } >
                    <ActionsheetBackdrop/>
                    <ActionsheetContent h="100px" >
                        <AddCategory/>
                    </ActionsheetContent>
                </Actionsheet>
            </div>
        </Center>
    )
}