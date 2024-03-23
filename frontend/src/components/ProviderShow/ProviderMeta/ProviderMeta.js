import { ReactComponent as StarSvg } from '../../../assets/svg/reviewStar.svg'
import { formatAddress, formatPhoneNumber } from '../../../util/formatting';

const ProviderMeta = ({vendor, reviewAverage, reviewCount}) => {
    const phoneNumber = vendor?.phoneNumber ? vendor.phoneNumber : '*********'
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    return (
        <>
            <div className="meta-info-block">
                <div className="provider-logo-background">
                    <img className="provider-logo" src={vendor?.logoImageUrl} />
                </div>
                <div className="meta-info-container">
                    <h1 className="provider-name">{vendor?.name ? vendor.name : "--"}</h1>
                    <p className="review-tag">{eval(reviewAverage) ? reviewAverage : "-.-"}
                        <StarSvg className="review-star-svg"/>{reviewCount} ratings
                    </p>
                </div>
            </div>
            <div className="location-details-container">
                <p>{formattedPhoneNumber}</p>
                <p style={{margin: "10px 0"}}>{vendor?.email ? vendor.email : '--'}</p>
                <p>{vendor?.address ? formatAddress(vendor.address) : '--'}</p>
            </div>
        </>
    )
}

export default ProviderMeta;