import React, { useState } from "react";
import api from "@/app/_services/GlobalApi";
import { useRouter } from "next/navigation";

function ReviewSection({ user, reviews, businessId, getBusinessById }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    stars: 10,
    reviewText: "",
  });

  const reviewExists = reviews.find((review) => review.email === user.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Review submitted", formData);
    try {
      const response = await api.createReview({
        email: user.email,
        profileImage: user.image,
        reviewText: formData.reviewText,
        star: formData.stars,
        userName: user.name,
        businessId: businessId,
      });
      console.log(response);
      await getBusinessById();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-4">
      {!reviewExists && (
        <form onSubmit={handleSubmit}>
          <h3 className="font-medium text-xl">Add Review</h3>
          <div>
            <Stars
              rating={formData.stars}
              handleRatingChange={(rating) =>
                setFormData((prev) => ({ ...prev, stars: rating }))
              }
            />
          </div>
          <div>
            <textarea
              className="border border-gray-300 w-full p-2"
              value={formData.reviewText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, reviewText: e.target.value }))
              }
              placeholder="Write your review here"
            />
          </div>
          <button className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      )}
      {reviews.length > 0 && (
        <div>
          <h3 className="text-xl">Reviews</h3>
          {reviews.map((review) => (
            <div
              key={review.email}
              className="flex  mt-3 border border-gray-300 w-full px-4 py-3 rounded-sm"
            >
              <img
                src={review.profileImage}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h4 className="font-medium">{review.userName}</h4>
                <div className="mb-2">
                  <Stars rating={review.star} />
                  <span>{review.star} / 10</span>
                </div>
                <p>{review.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Stars = ({ rating, handleRatingChange }) => {
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    stars.push(
      <span
        key={i}
        style={{
          fontSize: "24px",
          color: i <= rating ? "gold" : "gray",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => handleRatingChange(i)}
      >
        &#9733;
      </span>
    );
  }
  return <div>{stars}</div>;
};

export default ReviewSection;
