import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function ContentThreeColumns(props) {
  const { left, center, right } = props;
  return (
    <Grid container spacing={3} justify="center" alignItems="flex-start">
      <Grid item xs={12} sm={2} md={3}>
        <Box display="flex" justifyContent="flex-end">
          <Box maxWidth="240px">
            {left}
          </Box>
        </Box>
      </Grid>
      <Grid container item xs={12} sm={8} md={6} justify="center">
        {center}
      </Grid>
      <Grid item xs={12} sm={2} md={3}>
        {right}
      </Grid>
    </Grid>
  );
}

ContentThreeColumns.propTypes = {
  left: PropTypes.any.isRequired,
  center: PropTypes.any.isRequired,
  right: PropTypes.any,
};

ContentThreeColumns.defaultProps = {
  right: null,
};

export default ContentThreeColumns;
