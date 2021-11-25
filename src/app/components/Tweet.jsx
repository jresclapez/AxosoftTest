import React from 'react';
import { Fieldset } from 'primereact/fieldset';
import PropTypes from 'prop-types';

const Tweet = ({ tweet }) => (
  <Fieldset key={tweet.id} legend={new Date(tweet.created_at).toDateString()}>
    {tweet.text}
  </Fieldset>
);

Tweet.propTypes = {
  tweet: PropTypes.object
};

export default Tweet;
