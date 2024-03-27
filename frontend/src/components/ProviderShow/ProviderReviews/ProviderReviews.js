import { useDispatch, useSelector } from "react-redux";
import "./ProviderReviews.css";
import ReviewIndexItem from "../../Reviews/ReviewIndexItem";
import { useEffect } from "react";
import { fetchReviews } from "../../store/reviews";
import { openModal } from "../../store/ui";
import { fetchOrders, getPastVendorIds } from "../../store/orders";

const ProviderReviews = ({ id }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) =>
  state?.reviews ? Object.values(state.reviews) : []
  );
  const currentUser = useSelector((state) => state.session?.user);
  const isUserReviewed = reviews.some(
    (review) => review.userId === currentUser.id
    );
    
  const pastVendorIds = useSelector(getPastVendorIds).map(Number);
  const isPrevCustomer = pastVendorIds.includes(Number(id));

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchOrders(currentUser.id));
  }, [currentUser.id, dispatch]);

  return (
    <div className="reviews">
      <h3 className="reviews-header">Reviews</h3>
      {!isUserReviewed && isPrevCustomer && (
        <button
          className="vendor-review-button"
          onClick={() => dispatch(openModal("review-form", { vendorId: id }))}
        >
          Add a Review
        </button>
      )}
      <ul className="provider-review-index">
        {reviews &&
          reviews.reverse().map((review) => {
            return <ReviewIndexItem review={review} key={review?.id} />;
          })}
      </ul>
    </div>
  );
};

export default ProviderReviews;
