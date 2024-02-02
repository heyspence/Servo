import LoginNav from "./LoginNav";
import HomeNav from "./HomeNav";
import Menu from "./Menu";
import Cart from "../Cart";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../store/session";
import { useState } from "react";
import { toggleCart } from "../store/cart";

const NavigationBar = () => {
    const userLoggedIn = useSelector(isLoggedIn)
    const [isMenuOpen, setIsMenuOpen] = useState();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return(
        <>
            <LoginNav display={!userLoggedIn} />
            <HomeNav display={userLoggedIn} toggleMenu={toggleMenu} toggleCart={toggleCart} />
            <Menu isMenuOpen={isMenuOpen} closeMenu={()=>{setIsMenuOpen(false)}}/>
            <Cart />
        </>
    )
}

export default NavigationBar;