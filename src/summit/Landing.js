import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';

export default function () {
  return (
    <Box mb={6}>
      <Card>
        <CardMedia
          component="img"
          alt="Summit Event"
          image="/images/entre-summit.png"
          title="Summit Event"
        />
      </Card>
    </Box>
  );
}
