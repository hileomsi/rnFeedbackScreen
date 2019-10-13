import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { PageContainer, AnimatedLinearGradient } from './Page.styles';
import Gradient from 'react-native-css-gradient';

export default function Page(props) {
  const { backgroundColors, children } = props;

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <AnimatedLinearGradient
        beginColor={backgroundColors[0]}
        endColor={backgroundColors[1]}
      >
        <PageContainer>{children}</PageContainer>
      </AnimatedLinearGradient>
    </Fragment>
  );
}
