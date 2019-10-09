import { Animated } from 'react-native';
import GradientHelper from '../GradientHelper/GradientHelper';
import styled from 'styled-components/native';

export const PageContainer = styled.SafeAreaView`
  flex: 1;
  /* background-color: #00897B; */
`;

export const AnimatedLinearGradient = styled(
  Animated.createAnimatedComponent(GradientHelper)
)``;
