import React from "react";

import MenuItemLink from "./MenuItemLink";
import {sidebarMenu} from "../data/sidebarMenu";
import {MenuList, Link} from "@mui/material";
import {styled} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoIcon from "../../icons/LogoIcon";
import {twitterIcon} from "../data/twitterIcon";
import Button from "@mui/material/Button";
import TweetButton from "./TweetButton";
import {useLocation} from "react-router-dom";

const SidebarMenu = () => {
    let location = useLocation();

    const {
        mainMenuStyle,
        buttonStyles,
        navItems,
        textStyle,
    } = sidebarMenu;
    const {color, href} = twitterIcon;

    const matches = useMediaQuery('(max-width:1280px)');

    const StyledMenuList = styled(props => (<MenuList {...props}/>))
    (({theme}) => (matches ? {...mainMenuStyle, ...mainMenuStyle.active} : {...mainMenuStyle}));

    const StyledButton = styled(props => (<Button {...props}/>))(() => ({...buttonStyles}))

    return (
        <>
            <div>
                <StyledMenuList>
                    <Link
                        sx={{padding: "15px"}}
                        color={color}
                        href={href}>
                        <LogoIcon/>
                    </Link>
                    {navItems.map(({text, iconName, iconActive, color, href, onclick}) => (
                            <MenuItemLink
                                key={text}
                                iconName={location.pathname === href ? iconActive : iconName}
                                text={text}
                                textStyle={location.pathname === href ? {...textStyle, ...textStyle.active} : textStyle}
                                iconStyle={{color, fontSize: 30}}
                                href={href}
                                onClick={onclick}
                            />
                        )
                    )}

                    {matches ? <TweetButton/> : <StyledButton>Tweet</StyledButton>}
                </StyledMenuList>
            </div>
        </>
    );
}

export default SidebarMenu;
