import React from 'react';
import Tweet from './Tweet';
import PropTypes from 'prop-types';

const Tweets = ({ tweets }) => {
  return tweets.map((tweet, index) => {
    return (
      <>
        <br />
        <div key={index}>
          <Tweet tweet={tweet} />
        </div>
      </>
    );
  });
};

Tweets.propTypes = {
  tweets: PropTypes.array
};

export default Tweets;
