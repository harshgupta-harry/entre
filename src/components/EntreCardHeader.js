import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import EntreLink from './EntreLink';
import EntreAvatar from './EntreAvatar';

function EntreCardHeader(props) {
  const {
    author, title, subtitle, action,
  } = props;
  return (
    <CardHeader
      avatar={(
        <EntreLink href="/profile/[username]" as={`/profile/${author.username}`}>
          <EntreAvatar
            fullName={author.fullName}
            avatar={author.avatar}
            isPro={author.isPro}
          />
        </EntreLink>
        )}
      action={action}
      title={<EntreLink href="/profile/[username]" as={`/profile/${author.username}`}>{author.fullName}</EntreLink>}
      subheader={(
        <>
          <div style={{ fontSize: '15px' }}>{title}</div>
          <div style={{ fontSize: '15px' }}>{subtitle}</div>
        </>
        )}
    />
  );
}

EntreCardHeader.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  action: PropTypes.any,
};

EntreCardHeader.defaultProps = {
  title: '',
  subtitle: '',
  action: null,
};

export default EntreCardHeader;
