import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItems } from "../../store/menuItems";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MenuItemIndexItem from "../MenuItemIndexItem";
import './MenuItemIndex.css'

const MenuItemIndex = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const menuItems = useSelector((state)=>{
        return state.menuItems
            ? Object.values(state.menuItems).filter(item => item.vendorId == id)
            : [];
    });

    useEffect(()=> {
        dispatch(fetchMenuItems(id))
    },[dispatch, id])

    return(
        <ul className="menu-items-index">
            {menuItems && menuItems.map(menuItem => {
                return(
                    <MenuItemIndexItem 
                        key={menuItem.id}
                        name={menuItem.name} 
                        price={menuItem.price}
                        imageUrl={menuItem.imageUrl}
                        id={menuItem.id}
                    />
                )
            })}
        </ul>
    )
}

export default MenuItemIndex;