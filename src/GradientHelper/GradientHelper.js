import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default class GradientHelper extends Component {

  render() {
    const { color1, color2, style, children } = this.props;

    return (
      <LinearGradient
        colors={[color1, color2]}
        style={{ flex: 1, }}
      >
        {children}
      </LinearGradient>
    );
  }
}