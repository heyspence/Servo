import { useDispatch, useSelector } from 'react-redux'
import './VendorIndex.css'
import { fetchVendors } from '../../store/vendor';
import { useEffect } from 'react';
import VendorIndexItem from '../VendorIndexItem';

const VendorIndex = () => {
    const vendors = useSelector(state => state?.vendors)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchVendors());
    },[dispatch])

    return(
        <>
            <div className="vendor-index-container">
                <div className="vendor-index">
                <h1>St George, UT<div className="status-green"> </div></h1>
                    <ul>
                        {Object.values(vendors).map((vendor => {
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