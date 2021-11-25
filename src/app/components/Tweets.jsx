import React from 'react';
import Tweet from './Tweet';
import PropTypes from 'prop-types';

const Tweets = ({ tweets }) => (
  <>
    {tweets.map((tweet) => (
      <Tweet key={tweet.id} tweet={tweet} />
    ))}
  </>
);

Tweets.propTypes = {
  tweets: PropTypes.array
};

export default Tweets;
