import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VALUES = [
  'upset',
  'sad',
  'neutral',
  'smile',
  'excited',
];

export default function Stars(props) {
  const { value, onPressStar } = props;
  const indexSelected = (VALUES.findIndex(v => v === value) + 1) || -1;
  const stars = Array(5).fill('');
  
  return (
    <Fragment>
      {stars.map((star, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          onPress={() => onPressStar(VALUES[index])}
          hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <Ionicons
            name={index < indexSelected ? "ios-star": "ios-star-outline"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      ))}
    </Fragment>
  );
}