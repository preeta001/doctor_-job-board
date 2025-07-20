import React from "react";
import "./JobCard.css"; // optional styling file

const Star = ({ filled, half }) => {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className="star">
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.846L19.335 24 12 19.771 4.665 24 6 15.594 0 9.748l8.332-1.73z" />
      </svg>
    );
  } else if (half) {
    return (
      <svg viewBox="0 0 24 24" className="star">
        <defs>
          <linearGradient id="halfGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="#000" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfGradLeft)"
          stroke="#ccc"
          d="M12 .587l3.668 7.431L24 9.748l-6 5.846L19.335 24 12 19.771 4.665 24 6 15.594 0 9.748l8.332-1.73z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="star">
      <path
        fill="none"
        stroke="#ccc"
        d="M12 .587l3.668 7.431L24 9.748l-6 5.846L19.335 24 12 19.771 4.665 24 6 15.594 0 9.748l8.332-1.73z"
      />
    </svg>
  );
};


const JobCard = ({ job, isBookmarked, toggleBookmark }) => {
  const ratingValue = Math.min(5, Math.max(0, parseFloat(job.rating) || 0));
  const fullStars = Math.floor(ratingValue);
  const halfStar = ratingValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="job-card">
      <div
        className={`bookmark-icon ${isBookmarked ? "filled" : ""}`}
        onClick={() => toggleBookmark(job.id)}
        title={isBookmarked ? "Remove Bookmark" : "Save Job"}
      >
        <svg viewBox="0 0 24 24">
          <path d="M5 3a2 2 0 012-2h10a2 2 0 012 2v18l-7-5-7 5V3z" />
        </svg>
      </div>

      <h3>{job.title}</h3>
      <p>{job.specialization}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Experience:</strong> {job.experience}</p>

      <div className="rating">
        {[...Array(fullStars)].map((_, i) => <Star key={i} filled />)}
        {halfStar && <Star filled={false} half />}
        {[...Array(emptyStars)].map((_, i) => <Star key={i + fullStars + 1} />)}
      </div>
    </div>
  );
};

export default JobCard;
