import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {InitializedContext} from '../store/contexts/InitializedContext';
import {SquaresRemainingContext} from '../store/contexts/SquaresRemainingContext';
import {ColorStatesContext} from '../store/contexts/ColorStatesContext';
import uuid from 'uuid-random';

const rgbaValues = [
  [200, 0, 0],
  [0, 200, 0],
  [0, 0, 200],
  [200, 200, 0],
  [200, 0, 200],
  [0, 200, 200],
];

const Square = ({index, init}) => {
  const [initialized, setInitialized] = useContext(InitializedContext);
  const [squaresRemaining] = useContext(SquaresRemainingContext);
  const {colorStates, updateColorStates} = useContext(ColorStatesContext);

  function randomizeColor() {
    let randNum = Math.floor(Math.random() * 6);
    while (randNum === colorStates[index]) {
      randNum < 5 ? randNum++ : randNum--;
    }
    updateColorStates(index, randNum);
  }

  useEffect(() => {
    initialized && updateColorStates(index, init);
    return undefined;
  }, [initialized]);

  const getColor = (state) => `rgba(${rgbaValues[state].join(', ')}, 1)`;

  return (
    <View
      key={uuid()}
      onTouchStart={() =>
        !initialized ? setInitialized(true) : randomizeColor()
      }
      style={{
        ...styles.Square,
        backgroundColor: `${
          !initialized ? '#aaa' : getColor(colorStates[index])
        }`,
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
