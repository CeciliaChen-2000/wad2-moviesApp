import React from "react";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

const WriteReviewIcon = ({ movie }) => {
  return (
    <Link underline="none"
      to={{
        pathname: `/reviews/form`,
        state: {
          movieId: movie.id,
        },
      }}
    >
      <Tooltip title="Add review">
        <RateReviewIcon color="primary" fontSize="large" />
      </Tooltip>
    </Link>
  );
};

export default WriteReviewIcon;