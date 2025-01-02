import "../assets/css/review.css";

const reviews = [
  {
    title: "Excellent Service!",
    body: "I was very impressed with the quality of service. The team was responsive, knowledgeable, and went above and beyond to meet my needs. I would highly recommend their services to anyone.",
    rating: 5,
    reviewer: {
      name: "John Doe",
      avatar:
        "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    },
    date: "2023-12-20",
  },
  {
    title: "Great Value for Money",
    body: "I was pleasantly surprised by the affordability of their services. Considering the quality of work, they are definitely worth the price. I will be using them again in the future.",
    rating: 4,
    reviewer: {
      name: "Jane Smith",
      avatar:
        "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    },
    date: "2023-12-15",
  },
  {
    title: "Fast and Reliable",
    body: "They completed the project quickly and efficiently. I was very impressed with their turnaround time and the quality of their work.",
    rating: 4,
    reviewer: {
      name: "Alice Johnson",
      avatar:
        "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    },
    date: "2023-12-10",
  },
];

const Review = () => {
  return (
    <>
      <h3 className="latest-review">Latest reviews</h3>

      <div className="review-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="star-rating">
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className="star">
                  ★
                </span>
              ))}
            </div>
            <h3>{review.title}</h3>
            <p>{review.body}</p>
            <div className="reviewer-info">
              <img
                src={review.reviewer.avatar}
                alt={review.reviewer.name}
                className="reviewer-image"
              />
              <div>
                <p className="reviewer-name">{review.reviewer.name}</p>
                <p className="date">{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Review;
