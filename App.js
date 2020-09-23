import React, {useContext} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import {SquaresRemainingContext} from './store/contexts/SquaresRemainingContext';
import VictoryMessageBox from './components/VictoryMessageBox';

const App = () => {
  const [squaresRemaining] = useContext(SquaresRemainingContext);

  return (
    <View style={styles.App}>
      <Header />
      {!squaresRemaining && <VictoryMessageBox />}
      <View style={styles.body}>
        <GameBoard />
        <Text>Squares Remaining: {squaresRemaining}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Copyright 2020; SquareMatch</Text>
        <Text>Nick Barak</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  App: {
    backgroundColor: '#333',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 450,
  },
  footer: {
    alignItems: 'center',
  },
});

export default App;
