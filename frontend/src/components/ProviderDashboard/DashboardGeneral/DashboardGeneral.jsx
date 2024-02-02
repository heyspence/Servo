import { useState } from 'react';
import './DashboardGeneral.css'
import ProviderGallery from '../../ProviderShow/ProviderGallery/ProviderGallery';
import VendorIndexItem from '../../Vendor/VendorIndexItem';

const DashboardGeneral = ({vendor}) => {
    const [openForm, setOpenForm] = useState(null);
    const [formData, setFormData] = useState({
        name: vendor.name,
        phoneNumber: vendor.phoneNumber,
        address: vendor.address
    });

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setOpenForm(null)
    }

    const handleFormChange = (attribute, value) => {
        setFormData(prev => ({
            ...prev,
            [attribute]: value
        }))
    }

    const infoForm = () => {
        return (
            <form className={openForm === 'Info' ? 'info-form' : 'minimize'}>
                <input placeholder="Name" type="text" value={formData.name} onChange={(e) => handleFormChange('name', e.target.value)}/>
                <input placeholder="Address" type="text" value={formData.address} onChange={(e) => handleFormChange('address', e.target.value)}/>
                <input placeholder="Phone Number" type="text" value={formData.phoneNumber}onChange={(e) => handleFormChange('phoneNumber', e.target.value)}/>
                <button className="edit-button info-submit-button" onClick={handleInfoSubmit}>Submit</button>
            </form>
        )
    }

    return (
        <div className="dashboard-general">
            <div className="general-left">
                <div className="general-info-container">
                    <div className={openForm === 'Info' ? 'minimize' : ''}>
                        <h2>{vendor.name}</h2>
                        <p>{vendor.address}</p>
                        <p>{vendor.phoneNumber}</p>
                        <button className="edit-button" onClick={()=>setOpenForm('Info')}>Edit</button>
                    </div>
                    {infoForm()}
                </div>
                <div className="general-info-container">
                    <VendorIndexItem id={vendor.id} name={vendor.name} imageUrl={vendor.imageUrl}/>
                    <button className="edit-button">Edit</button>
                </div>
            </div>
            <div className="general-right">
                <ProviderGallery id={vendor.id}/>
            </div>
        </div>
    )
}

export default DashboardGeneral;