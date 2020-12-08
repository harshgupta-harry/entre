import React from 'react';
import Container from '@material-ui/core/Container';
import withAuth from '../src/helpers/withAuth';
import Header from '../src/components/Header';
import HorizontalLinearStepper from '../src/onboarding/Stepper';

function OnboardingScreen() {
  return (
    <>
      <Container>
        <Header />
        <HorizontalLinearStepper />
      </Container>
    </>
  );
}
export default withAuth(OnboardingScreen, { hideNav: true });
