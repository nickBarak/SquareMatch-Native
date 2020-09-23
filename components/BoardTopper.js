import React, {useContext, useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ColorStatesContext} from '../store/contexts/ColorStatesContext';
import {InitializedContext} from '../store/contexts/InitializedContext';
import {SquaresRemainingContext} from '../store/contexts/SquaresRemainingContext';
import {TimeContext} from '../store/contexts/TimeContext';
import FadingView from './FadingView';

const BoardTopper = () => {
  const {time, stopTimer, setTime} = useContext(TimeContext);
  const [squaresRemaining] = useContext(SquaresRemainingContext);
  const [, setInitialized] = useContext(InitializedContext);
  const {resetColorStates} = useContext(ColorStatesContext);
  const [showHelp, setShowHelp] = useState(false);
  const help = useRef(null);
  const [hidingHelp, setHidingHelp] = useState(false);

  useEffect(() => {
    !squaresRemaining && stopTimer();
    return undefined;
  }, [squaresRemaining]);

  useEffect(() => {
    if (help.current) help.current.style.opacity = 1;
  }, [showHelp]);

  const resetApp = () => {
    stopTimer();
    setTime('00:00:00');
    resetColorStates();
    setInitialized(false);
  };

  return (
    <View style={styles.BoardTopper}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetApp}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <Text>{time}</Text>
      </View>
      {showHelp && (
        <FadingView
          style={styles.help}
          ref={help}
          hiding={hidingHelp}
          hide={() => {
            setShowHelp(false);
            setHidingHelp(false);
          }}>
          <Text style={styles.helpText}>
            The goal of the game is to convert all of the squares to the same
            color as fast as you can.
          </Text>
          <Text style={styles.helpText}>
            Squares will change color randomly as you tap them. The counter in
            the squares' centers will keep track of how many squares you need to
            convert to win.
          </Text>
          <Text style={styles.helpText}>
            The reset button will restart your game at any time and start a new
            game once you finish. Sign in to keep track of your fastest times!
          </Text>
        </FadingView>
      )}
      <TouchableOpacity
        style={{...styles.resetButton, marginRight: 0}}
        onPress={() => (!showHelp ? setShowHelp(true) : setHidingHelp(true))}>
        <Text style={{fontSize: 12.5}}>How to Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  BoardTopper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7.5,
    width: 226,
    position: 'relative',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  resetButton: {
    borderRadius: 7,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#ddd',
    marginRight: 9,
  },
  help: {
    backgroundColor: 'white',
    padding: 15,
    paddingBottom: 0,
    borderRadius: 15,
    position: 'absolute',
    zIndex: 5,
    width: 300,
    left: -30,
    top: 40,
  },
  helpText: {
    marginBottom: 20,
  },
});

export default BoardTopper;
