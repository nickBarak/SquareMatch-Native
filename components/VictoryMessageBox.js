import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {UserContext} from '../store/contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';
import {TimeContext} from '../store/contexts/TimeContext';

const VictoryMessageBox = () => {
  const [user] = useContext(UserContext);
  const [bestTime, setBestTime] = useState('59:59:99');
  const {time} = useContext(TimeContext);

  useEffect(() => {
    AsyncStorage.getItem(user)
      .then((recordTime) => setBestTime(recordTime))
      .catch((e) => console.log(e));
    return undefined;
  });

  return (
    <View style={styles.VictoryMessageBox}>
      <Text style={styles.victoryText}>Victory!</Text>
      <Text style={styles.finishedIn}>Finished in: {time}</Text>
      <Text style={styles.bestTime}>Best time: {bestTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  VictoryMessageBox: {
    position: 'absolute',
    top: '29%',
    left: '33%',
    zIndex: 5,
    backgroundColor: 'white',
    height: 150,
    width: 150,
    borderRadius: 12,
    alignItems: 'center',
  },
  victoryText: {
    fontSize: 30,
    color: 'red',
    fontFamily: 'Helvetica',
    marginTop: 4,
  },
  finishedIn: {
    marginTop: 55,
    fontSize: 12,
  },
  bestTime: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default VictoryMessageBox;
