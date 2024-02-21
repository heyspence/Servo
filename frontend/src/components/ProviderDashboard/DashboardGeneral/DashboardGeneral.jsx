import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './DashboardGeneral.css'
import ProviderGallery from '../../ProviderShow/ProviderGallery/ProviderGallery';
import VendorIndexItem from '../../Vendor/VendorIndexItem';
import { updateVendor } from '../../store/vendor';
import { formatPhoneNumber } from '../../../util/formatting';
import { useEffect } from 'react';

const DashboardGeneral = ({vendor = {}}) => {
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(null);
    const [indexImage, setIndexImage] = useState(vendor?.imageUrl)
    const [formData, setFormData] = useState({
        name: vendor.name,
        phoneNumber: vendor.phoneNumber,
        address: vendor.address
    });

    useEffect(()=>{
        setIndexImage(vendor.imageUrl)
    },[vendor])

    const handleInfoSubmit = (e) => {
        let vendorData = {
            ...formData,
            id: vendor.id
        }
        e.preventDefault();
        dispatch(updateVendor(vendorData))
        setOpenForm(null)
    }

    const handleFormChange = (attribute, value) => {
        setFormData(prev => ({
            ...prev,
            [attribute]: value
        }))
    }

    const handleImageChange = e => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setIndexImage(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }

    const infoForm = () => {
        return (
            <form className={openForm === 'Info' ? 'info-form' : 'minimize'}>
                <input placeholder="Name" type="text" value={formData.name} onChange={(e) => handleFormChange('name', e.target.value)}/>
                <input placeholder="Address" type="text" value={formData.address} onChange={(e) => handleFormChange('address', e.target.value)}/>
                <input placeholder={vendor.phoneNumber} type="text" value={formData.phoneNumber}onChange={(e) => handleFormChange('phoneNumber', e.target.value)}/>
                <button className="edit-button info-submit-button" onClick={handleInfoSubmit}>Save</button>
            </form>
        )
    }

    const indexImageEditTools = () => {
        if(openForm === 'IndexImage'){
            return  <>
                        <input type="file" accept="image/*" onChange={handleImageChange}/>
                        <button className="edit-button info-submit-button" onClick={() => setOpenForm(null)}>Save</button>
                    </>
        }else{
            return <button className="edit-button" onClick={() => setOpenForm('IndexImage')}>Edit</button>
        }
    }

    return (
        <div className="dashboard-general">
            <div className="general-left">
                <div className="general-info-container">
                    <div className={openForm === 'Info' ? 'minimize' : ''}>
                        <h2>{vendor.name}</h2>
                        <p>{vendor.address}</p>
                        <p>{formatPhoneNumber(vendor.phoneNumber)}</p>
                        <button className="edit-button" onClick={()=>setOpenForm('Info')}>Edit</button>
                    </div>
                    {infoForm()}
                </div>
                <div className="general-info-container">
                    <VendorIndexItem id={vendor.id} name={vendor.name} imageUrl={indexImage}/>
                    {indexImageEditTools()}
                </div>
            </div>
            <div className="general-right">
                <ProviderGallery id={vendor.id}/>
            </div>
        </div>
    )
}

export default DashboardGeneral;