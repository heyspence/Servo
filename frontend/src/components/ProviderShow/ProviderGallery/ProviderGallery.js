import { useEffect } from 'react';
import './ProviderGallery.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../store/images';

const ProviderGallery = ({id}) =>{
    const dispatch = useDispatch();
    const images = useSelector(state => state?.images ? Object.values(state.images) : []);

    useEffect(()=>{
        dispatch(fetchImages(id));
    },[dispatch, id])

    return (
        <div className="gallery-container">
            <h3 className="gallery-header">Gallery</h3>
            <div className="provider-gallery">
                {images && images.map((image, index) => {
                    return <img className="provider-photo" 
                                src={image.url} alt={image.alt} 
                                loading={index > 4 ? 'lazy' : undefined} 
                                key={image.id} 
                            />
                })}
            </div>
        </div>
    )}

export default ProviderGallery;