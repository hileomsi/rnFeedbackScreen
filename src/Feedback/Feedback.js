import React, { Component, useState } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { interpolate } from 'flubber';
import { tween, easing } from 'popmotion';
import Svg, { G, Path } from 'react-native-svg';
import {
  Title,
  Subtitle,
  Content,
  FormContainer,
  FaceContainer,
  SubtitleContainer,
  SubmitButton,
  LabelSubmitButton,
  StarsContainer,
} from './Feedback.styles';
import Stars from '../Stars/Stars';
import Page from '../Page/Page';

const { width, height } = Dimensions.get('screen');

const fill = "#333";

const PATHS = {
  "upset": "M141.5 132.55C140.92 75.87 120.92 48.22 81.5 49.63C42.09 51.03 22.09 78.67 21.5 132.55L141.5 132.55Z",
  "sad": "M122.32 87.65C121.94 68.08 108.83 58.53 83 59.02C57.17 59.5 44.06 69.04 43.68 87.65L122.32 87.65Z",
  "neutral": "M38.02 58.05L99.77 40.83L102.99 52.35L41.23 69.57L38.02 58.05Z",
  "smile": "M122.32 64.68C121.94 84.25 108.83 93.79 83 93.31C57.17 92.82 44.06 83.28 43.68 64.68L122.32 64.68Z",
  "excited": "M142.99 49.74C142.4 106.42 122.4 134.06 82.99 132.66C43.57 131.26 23.57 103.62 22.99 49.74L142.99 49.74Z",
  "left-eye": "M30.43 16.78C30.43 24.39 24.29 30.57 16.72 30.57C9.15 30.57 3 24.39 3 16.78C3 9.18 9.15 3 16.72 3C24.29 3 30.43 9.18 30.43 16.78Z",
  "right-eye": "M162.99 16.79C162.99 24.4 156.84 30.57 149.27 30.57C141.7 30.57 135.56 24.4 135.56 16.79C135.56 9.18 141.7 3.01 149.27 3.01C156.84 3.01 162.99 9.18 162.99 16.79Z"
};

const COLORS = {
  upset: ['#EA5455', '#E80505'],
  sad: ['#F05F57', '#360940'],
  neutral: ['#4c669f', '#192f6a'],
  smile: ['#79F1A4', '#0E5CAD'],
  excited: ['#70F570', '#49C628'],
};

const STARS = [
  'upset',
  'sad',
  'neutral',
  'smile',
  'excited',
];



export default function App() {
  const [star, setStar] = useState('neutral');
  const [path, setPath] = useState(PATHS['neutral']);
  const [backgroundColorsAnimated] = useState(new Animated.Value(2));
  const backgroundColor1 = backgroundColorsAnimated.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      COLORS.upset[0],
      COLORS.sad[0],
      COLORS.neutral[0],
      COLORS.smile[0],
      COLORS.excited[0],
    ],
  });
  const backgroundColor2 = backgroundColorsAnimated.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [
      COLORS.upset[1],
      COLORS.sad[1],
      COLORS.neutral[1],
      COLORS.smile[1],
      COLORS.excited[1],
    ],
  });

  function startAnimation(newStar) {
    setStar(newStar);

    const interpolator = interpolate(path, PATHS[newStar], { maxSegmentLength: 2 });
    tween({
      duration: 200,
      ease: easing.easeInOut,
      from: { i: 0 },
      to: { i: 1 }
    })
    .pipe(({ i }) => ({ path: interpolator(i) }))
    .start(({ path }) => {
      setPath(path);
    });

    const indexStar = STARS.findIndex(el => el === newStar); 
    Animated.timing(backgroundColorsAnimated, {
      toValue: indexStar,
      duration: 400,
    }).start();
  }
  
  return (
    <Page backgroundColors={[backgroundColor1, backgroundColor2]}>
      <Content>
        <Title>Please rate your experience</Title>
        <SubtitleContainer>
          <Subtitle>Do let us know your thoughts.</Subtitle>
          <Subtitle>Your feedback matters!</Subtitle>
        </SubtitleContainer>
        <FaceContainer>
          <Svg width={width} height={height / 3} viewBox="0 0 166 136">
            <G>
              <Path d={PATHS["left-eye"]} fill={fill} />
              <Path d={path} fill={fill} />
              <Path d={PATHS["right-eye"]} fill={fill} />
            </G>
          </Svg>
        </FaceContainer>
        <FormContainer>
          <StarsContainer>
            <Stars
              value={star}
              onPressStar={startAnimation}
            />
          </StarsContainer>
          <SubmitButton onPress={() => {}}>
            <LabelSubmitButton>Submit</LabelSubmitButton>
          </SubmitButton>
        </FormContainer>
      </Content>
    </Page>
  );
}
