import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((props) => ({
  item: {
    backgroundColor: '#F3F5F9',
    height: '35px',
    borderRadius: '20px',
    lineHeight: '35px',
    padding: '0 20px',
    textAlign: 'center',
    display: 'inline-block',
    marginRight: '10px',
    marginTop: '20px',
    cursor: props.readonly ? 'default' : 'pointer',
  },
  selectedItem: {
    backgroundColor: '#00C4FF',
    color: '#FFFFFF',
  },
}));

const MultiSelector = memo((props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles(props);
  const { items, value, readonly } = props;
  const displayItems = readonly ? value || [] : items;
  const onItemSelect = (e) => {
    const item = e.target.innerHTML;
    if (props.max > 0 && value.length >= props.max) {
      if (props.max === 1) {
        props.onChange([item]);
      } else {
        enqueueSnackbar(`There is a limit of ${props.max} options`, {
          variant: 'warning',
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
      }
      return;
    }
    props.onChange([...value, item]);
  };

  const onItemClear = (e) => {
    const item = e.target.innerHTML;
    const selectedItems = value.filter((option) => option !== item);
    props.onChange(selectedItems);
  };

  const renderItems = () => displayItems.map((item) => {
    let className = classes.item;
    const isSelected = value.indexOf(item) !== -1;
    if (isSelected && !readonly) {
      className = `${classes.item} ${classes.selectedItem}`;
    }
    if (readonly) {
      return (
        <div
          key={item}
          className={className}
        >
          {item}
        </div>
      );
    }
    return (
      <div
        role="button"
        key={item}
        className={className}
        onClick={isSelected ? onItemClear : onItemSelect}
        onKeyPress={() => {}}
        tabIndex={0}
      >
        {item}
      </div>
    );
  });


  const renderContent = () => {
    if (readonly && props.readOnlyComponent) {
      return props.readOnlyComponent(displayItems);
    }
    return renderItems();
  };

  return (
    <>
      <Box className={classes.options}>
        {renderContent()}
      </Box>
    </>
  );
});

MultiSelector.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.array,
  max: PropTypes.number,
  onChange: PropTypes.any,
  readonly: PropTypes.bool,
  readOnlyComponent: PropTypes.any,
};

MultiSelector.defaultProps = {
  max: 0,
  onChange: () => {},
  readonly: false,
  readOnlyComponent: null,
  value: [],
};

export default MultiSelector;
