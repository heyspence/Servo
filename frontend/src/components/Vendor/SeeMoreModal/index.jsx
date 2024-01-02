import { ReactComponent as CloseIcon } from '../../../assets/svg/Close.svg'
import './SeeMoreModal.css'
import GoogleMaps from '../VendorShow/GoogleMap';

const SeeMoreModal = ({ vendor, onClose }) => {

    return (
        <div className="see-more-modal">
            <CloseIcon onClick={onClose} className="close-icon" />
            <h2>{vendor.name}</h2>
            <div id="google-maps-placeholder">
                {vendor.latitude && vendor.longitude && (
                    <GoogleMaps
                        lat={vendor.latitude}
                        lng={vendor.longitude}
                        name={vendor.name}
                        mapId={vendor.id}
                    />
                )}
            </div>
            <div className="see-more-address">
                <p>{vendor.address}</p>
            </div>
            <div className="review-form-footer white-font">
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default SeeMoreModal