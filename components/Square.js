import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {InitializedContext} from '../store/contexts/InitializedContext';
import {SquaresRemainingContext} from '../store/contexts/SquaresRemainingContext';
import {ColorStatesContext} from '../store/contexts/ColorStatesContext';
import uuid from 'uuid-random';
import {TimeContext} from '../store/contexts/TimeContext';

const rgbaValues = [
  [200, 0, 0],
  [0, 200, 0],
  [0, 0, 200],
  [200, 200, 0],
  [200, 0, 200],
  [0, 200, 200],
  [170, 170, 170],
];

const Square = ({index, init}) => {
  const [initialized, setInitialized] = useContext(InitializedContext);
  const [squaresRemaining] = useContext(SquaresRemainingContext);
  const {colorStates, initializeColorStates, updateColorStates} = useContext(
    ColorStatesContext,
  );
  const {time} = useContext(TimeContext);

  function randomizeColor() {
    let randNum = Math.floor(Math.random() * 6);
    while (randNum === colorStates[index]) {
      randNum < 5 ? randNum++ : randNum--;
    }
    updateColorStates(index, randNum);
  }

  function initializeGame() {
    updateColorStates(index, init, true);
    initializeColorStates(
      index === 0 ? 15 : index - 1,
      index === 15 ? 0 : index + 1,
    );
    setInitialized(true);
  }

  const getColor = (state) => `rgba(${rgbaValues[state].join(', ')}, 1)`;

  return (
    <View
      key={uuid()}
      onTouchStart={() =>
        !initialized ? initializeGame() : squaresRemaining && randomizeColor()
      }
      style={{
        ...styles.Square,
        backgroundColor: `${getColor(colorStates[index])}`,
      }}>
      <Text style={styles.text}>{squaresRemaining}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1.5,
    height: 50,
    width: 50,
    margin: 2,
  },
  text: {
    fontSize: 12,
  },
});

export default Square;
