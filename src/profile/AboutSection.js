// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  TextareaAutosize,
  Card,
} from '@material-ui/core';

import MultiSelector from '../components/MultiSelector';
import interests from '../../common/data/interests';
import useStyles from './Styles';
import SlimCardContent from '../components/SlimCardContent';

const AboutSection = (props) => {
  const classes = useStyles();
  const {
    loading,
    editMode,
    bio,
    industry,
    lookingFor,
    setBio,
    setIndustry,
    setLookingFor,
  } = props;

  const industries = useSelector((state) => state.account.industries);

  if (loading) return null;
  return (
    <>
      <Card style={{ marginBottom: 10 }}>
        <SlimCardContent style={{ padding: 20 }}>
          <div className={classes.title}>
            Bio
          </div>
          <div>
            {editMode
              ? (
                <TextareaAutosize
                  className={classes.bioInput}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rowsMin={5}
                />
              )
              : <p style={{ margin: 0, marginTop: 10 }}>{bio}</p>}
          </div>
        </SlimCardContent>
      </Card>
      <Card style={{ marginBottom: 10 }}>
        <SlimCardContent style={{ padding: 20 }}>
          <div className={classes.title}>
            Industries
          </div>
          <MultiSelector
            items={industries.map((i) => i.name)}
            max={3}
            readonly={!editMode}
            value={industry}
            onChange={setIndustry}
          />
        </SlimCardContent>
      </Card>
      <Card style={{ marginBottom: 10 }}>
        <SlimCardContent style={{ padding: 20 }}>
          <div className={classes.title}>
            Looking for
          </div>
          <MultiSelector
            items={interests.map((t) => t.name)}
            max={3}
            readonly={!editMode}
            value={lookingFor}
            onChange={setLookingFor}
          />
        </SlimCardContent>
      </Card>
    </>
  );
};

AboutSection.propTypes = {
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  industry: PropTypes.array.isRequired,
  lookingFor: PropTypes.array.isRequired,
  setBio: PropTypes.func.isRequired,
  setIndustry: PropTypes.func.isRequired,
  setLookingFor: PropTypes.func.isRequired,
};

AboutSection.defaultProps = {

};

export default AboutSection;
