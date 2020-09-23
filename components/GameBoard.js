import React, {useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import BoardTopper from './BoardTopper';
import Square from './Square';
import {InitializedContext} from '../store/contexts/InitializedContext';
import {SquaresRemainingContext} from '../store/contexts/SquaresRemainingContext';

function GameBoard() {
  const [initialized] = useContext(InitializedContext);
  const [squaresRemaining] = useContext(SquaresRemainingContext);

  return (
    <View style={styles.outerView}>
      <BoardTopper
        initialized={initialized}
        squaresRemaining={squaresRemaining}
      />
      <View style={styles.GameBoard}>
        {/* Generate 16 squares rotating through RGBA values array */}
        <FlatList
          style={styles.grid}
          numColumns={4}
          data={new Array(16).fill(true)}
          renderItem={({index}) => <Square index={index} init={index % 6} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerView: {
    alignItems: 'flex-start',
    maxHeight: '52.1%',
    maxWidth: '80%',
    marginBottom: 27.5,
  },
  GameBoard: {
    padding: 5,
    backgroundColor: '#777',
    marginBottom: 9,
  },
  grid: {},
});

export default GameBoard;
