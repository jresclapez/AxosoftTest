import React from 'react';
import { Fieldset } from 'primereact/fieldset';
import PropTypes from 'prop-types';

const Tweet = ({ tweet }) => {
  const tweetDate = new Date(tweet.created_at).toDateString();
  console.log(tweetDate);
  return <Fieldset legend={tweetDate}> {tweet.text}</Fieldset>;
};

Tweet.propTypes = {
  tweet: PropTypes.object
};

export default Tweet;
