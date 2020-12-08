import React from 'react';
import router from 'next/router';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EntreSearchTabs from './EntreSearchTabs';
import EntreSearchTab from './EntreSearchTab';

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: '100%' }}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `search-tab-${index}`,
    'aria-controls': `search-tabpanel-${index}`,
  };
}

function cleanString(string) {
  return string.replace(/\s/g, '').toLowerCase();
}

function EntreTabs(props) {
  const {
    tabs, fullWidth, hideTabs, style,
  } = props;

  const tab = router.query.section ? router.query.section : cleanString(tabs[0].title);
  const v = tabs.map((t) => cleanString(t.title)).indexOf(tab);
  const [value = v, setValue] = React.useState();

  const handleChange = (event, tabIdx) => {
    const section = cleanString(tabs[tabIdx].title);
    const as = `${window.location.pathname}?section=${section}`;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, section },
    }, as, { shallow: true });
    const va = tabs.map((t) => cleanString(t.title)).indexOf(section);
    setValue(va);
  };

  return (
    <>
      { hideTabs || tabs.length === 1 ? null
        : (
          <Grid container spacing={1} style={style} justify="center">
            {fullWidth ? null : <Grid item sm={2} md={3} /> }
            <Grid item container xs={10} sm={fullWidth ? 12 : 8} md={fullWidth ? 12 : 6}>
              <EntreSearchTabs value={value} onChange={handleChange}>
                { tabs.map((data, index) => (
                  <EntreSearchTab key={data.title} label={data.title} {...a11yProps(index)} />
                ))}
              </EntreSearchTabs>
            </Grid>
            {fullWidth ? null : <Grid item sm={2} md={3} /> }
          </Grid>
        )}
      { tabs.map((data, index) => (
        <TabPanel key={data.title} value={value} index={index}>
          {data.component}
        </TabPanel>
      ))}
    </>
  );
}

EntreTabs.propTypes = {
  tabs: PropTypes.any.isRequired,
  fullWidth: PropTypes.bool,
  hideTabs: PropTypes.bool,
  style: PropTypes.any,
};

EntreTabs.defaultProps = {
  fullWidth: false,
  hideTabs: false,
  style: {},
};

export default EntreTabs;
