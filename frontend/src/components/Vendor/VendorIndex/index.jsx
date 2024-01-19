import { useDispatch, useSelector } from 'react-redux'
import './VendorIndex.css'
import { fetchVendors } from '../../store/vendor';
import { useEffect } from 'react';
import VendorIndexItem from '../VendorIndexItem';

const VendorIndex = ({category}) => {
    const allVendors = useSelector(state => state?.vendors)
    const vendors = allVendors ? Object.values(allVendors).filter(vendor => vendor.category === category) : []
    const dispatch = useDispatch();
    const parsedCategory = category => {
        switch(category){
            case 'house_cleaning':
                return "House Cleaning"
            case 'pest_control':
                return "Pest Control"
            case 'auto_detailing':
                return "Car Detailing"
            case 'carpet_cleaning':
                return "Carpet Cleaning"
            case 'window_cleaning':
                return "Window Cleaning"
            case 'garbage_can_cleaning':
                return 'Garbage Can Cleaning'
            default:
                return `Unrecognized category: ${category}`
        }
    }

    useEffect(() => {
        dispatch(fetchVendors());
    },[dispatch])

    return(
        <>
            <div className="vendor-index-container">
                <h3>{parsedCategory(category)}</h3>
                <div className="vendor-index">
                    <ul>
                        {vendors.map((vendor => {
                            return <VendorIndexItem 
                                name={vendor.name} 
                                imageUrl={vendor.imageUrl} 
                                id={vendor.id} 
                                key={vendor.id} />
                        }))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default VendorIndex;