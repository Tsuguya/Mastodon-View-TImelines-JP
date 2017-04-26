/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import twemoji from 'twemoji';
import moment from 'moment';

function TootCard(props) {
  const parsedName = { __html: twemoji.parse(props.account.display_name) };
  const parsedText = { __html: twemoji.parse(props.content) };

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Image floated="right" avatar src={props.account.avatar} />
          <Card.Header>
            <a href={props.url} dangerouslySetInnerHTML={parsedName} />
          </Card.Header>
          <Card.Meta>
            <a href={props.account.url}>@{props.account.username}</a>
          </Card.Meta>
          <Card.Description dangerouslySetInnerHTML={parsedText} />
        </Card.Content>
        { props.media_attachments
          .filter(media => media.type === `image`)
          .map(media => <Image wrapped src={media.preview_url} key={media.preview_url} />)
        }
        <Card.Content extra>
          <span className="right floated">
            {moment(props.created_at, moment.ISO_8601).fromNow()}
          </span>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

TootCard.defaultProps = {
  media_attachments: [{
    type: null,
    preview_url: null,
  }],
};

TootCard.propTypes = {
  account: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
  media_attachments: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    preview_url: PropTypes.string,
  })).isRequired,
  url: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default TootCard;
