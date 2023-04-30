import React, { useState, useEffect } from "react";
import ReviewiItem from "./reviewitem";
import Reviewscoreboard from "./reviewscoreboard";


const ReviewList = () => {
  //load reviews
  const reviews = [
    {
      key: 1,
      name: "Bakul Buch",
      score: 5,
      time: "7:20",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum tenetur rem, nobis deleniti quas ipsam aperiam unde quos autem. Delectus.",
      profileurl: "https://picsum.photos/200",
    },
    {
      key: 2,
      name: "Bakul Buch",
      score: 5,
      time: "7:20",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum tenetur rem, nobis deleniti quas ipsam aperiam unde quos autem. Delectus.",
      profileurl: "https://picsum.photos/200",
    },
  ];
  const [reviewHtmlArray, setReviewHtmlArray] = useState([]);
  useEffect(() => {
    setReviewHtmlArray([
      ...reviewHtmlArray,
      reviews.map((ritem) => (
        <ReviewiItem
          key={ritem.key}
          type={ritem.type}
          message={ritem.message}
          time={ritem.time}
          name={ritem.name}
          profileurl="https://picsum.photos/200"
        />
      )),
    ]);
  }, []);
  //load reviews

  //setup scoreboard
  const scoreboard = {
    score: 5,
    average: 5,
    percentage: 5
  }
  for (const element in reviews) {
    scoreboard.score += element.score;
  }
  scoreboard.average = scoreboard.score / reviews.length;
  //setup scoreboard

  return (
    <div>
      {reviewHtmlArray}
      <Reviewscoreboard key={1000} count={5} average={39.76} percentage={79} />
    </div>
  );
};

export default ReviewList;
