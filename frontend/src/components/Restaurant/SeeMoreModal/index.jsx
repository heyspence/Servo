import { ReactComponent as CloseIcon } from '../../../assets/svg/Close.svg'
import './SeeMoreModal.css'
import GoogleMaps from '../RestaurantShow/GoogleMap';

const SeeMoreModal = ({ restaurant, onClose }) => {

    return (
        <div className="see-more-modal">
            <CloseIcon onClick={onClose} className="close-icon" />
            <h2>{restaurant.name}</h2>
            <div id="google-maps-placeholder">
                {restaurant.latitude && restaurant.longitude && (
                    <GoogleMaps
                        lat={restaurant.latitude}
                        lng={restaurant.longitude}
                        name={restaurant.name}
                        mapId={restaurant.id}
                    />
                )}
            </div>
            <div className="see-more-address">
                <p>{restaurant.address}</p>
            </div>
            <div className="review-form-footer white-font">
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default SeeMoreModal