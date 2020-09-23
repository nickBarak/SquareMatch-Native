import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {InitializedContext} from '../store/contexts/InitializedContext';

const Header = () => {
  const [initialized] = useContext(InitializedContext);
  const [prompt, setPrompt] = useState('Tap on a square to start!');

  useEffect(() => {
    if (initialized) {
      let interval = 320;
      setPrompt('Ready');
      setTimeout(() => setPrompt('Ready.'), interval);
      setTimeout(() => setPrompt('Ready..'), interval * 2);
      setTimeout(() => setPrompt('Set'), interval * 3);
      setTimeout(() => setPrompt('Set.'), interval * 4);
      setTimeout(() => setPrompt('Set..'), interval * 5);
      setTimeout(() => setPrompt('Go!'), interval * 6);
      setTimeout(
        () => setPrompt('Try to match all the squares!'),
        interval * 21,
      );
    } else setPrompt('Tap on a square to start!');
    return undefined;
  }, [initialized]);

  return (
    <View style={styles.Header}>
      <Text style={styles.title}>SquareMatch</Text>
      <Text style={styles.prompt}>{prompt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginLeft: 25,
    marginTop: 25,
    color: 'white',
    fontWeight: '800',
    fontFamily:
      'OCR A Std, monospace, Georgia, Comic Sans MS, Roboto sans, Arial, Helvetica',
  },
  prompt: {
    fontSize: 16,
    paddingTop: 26,
    paddingBottom: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
