import React from 'react';
import router from 'next/router';
import PropTypes from 'prop-types';

function EntreLink(props) {
  const { href, as, children } = props;
  return (
    <div
      href={href}
      style={{ cursor: 'pointer' }}
      role="button"
      onKeyPress={() => {}}
      tabIndex="0"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(href, as);
      }}
    >
      {children}
    </div>
  );
}

EntreLink.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  children: PropTypes.any.isRequired,
};

EntreLink.defaultProps = {
  as: undefined,
};

export default EntreLink;
