import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default class GradientHelper extends Component {

  render() {
    const { beginColor, endColor, style, children } = this.props;

    return (
      <LinearGradient
        colors={[beginColor, endColor]}
        style={{ flex: 1, }}
      >
        {children}
      </LinearGradient>
    );
  }
}