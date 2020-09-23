// import React, {createContext, useState, useContext, useEffect} from 'react';
// import {PermissionsAndroid} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import {UserContext} from './UserContext';
// import {InitializedContext} from './InitializedContext';

// export const TimeContext = createContext('00:00:00');

// export function TimeContextProvider({children}) {
//   const [time, setTime] = useState('00:00');
//   const [timerIntervals, setTimerIntervals] = useState([]);
//   const [user] = useContext(UserContext);
//   const [initialized] = useContext(InitializedContext);
//   const [timeFragments, setTimeFragments] = useState([0, 0, 0, 0]);

//   useEffect(() => {
//     initialized && setTimeout(startTimer, 2600);
//     return undefined;
//   }, [initialized]);

//   const updateTime = () => {
//     let timeString = timeFragments.join(':').split('');
//     timeString.splice(9, 1);
//     timeString.splice(5, 1);
//     timeString.splice(1, 1);
//     setTime(timeString.join(''));
//   };

//   const updateTimeFragment = (index, breakpoint = 9) => {
//     let timeFragmentsCopy = timeFragments;
//     timeFragmentsCopy.splice(
//       index,
//       1,
//       timeFragments[index] === breakpoint ? 0 : timeFragments[index] + 1,
//     );
//     setTimeFragments(timeFragmentsCopy);
//   };

//   function startTimer() {
//     setTimerIntervals([
//       // setInterval(() => {
//       //   updateTimeFragment(5);
//       //   updateTime();
//       // }, 10),
//       // setInterval(() => {
//       //   updateTimeFragment(4);
//       //   updateTime();
//       // }, 100),
//       setInterval(() => {
//         updateTimeFragment(3);
//         updateTime();
//       }, 1000),
//       setInterval(() => {
//         updateTimeFragment(2, 5);
//         updateTime();
//       }, 10 * 1000),
//       setInterval(() => {
//         updateTimeFragment(1);
//         updateTime();
//       }, 6 * 10 * 1000),
//       setInterval(() => {
//         updateTimeFragment(0, 5);
//         updateTime();
//       }, 10 * 6 * 10 * 1000),
//     ]);
//   }

//   async function stopTimer() {
//     timerIntervals.forEach((interval) => clearInterval(interval));

//     const permissionGranted = PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       {
//         title: 'Permission to Store Times',
//         message: 'Allow SquareMatch to save your times in local storage?',
//         buttonPositive: 'Ok',
//         buttonNegative: 'No',
//         buttonNeutral: 'Ask Later',
//       },
//     );

//     if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Permission to store data received');

//       let userData = await AsyncStorage.getItem(user);
//       !userData && (await AsyncStorage.setItem(user, '59:59:99'));

//       //   document.getElementById('victoryTime').innerHTML = `Finished in: ${time}`;
//       await AsyncStorage.setItem(
//         user,
//         [userData, time].sort(
//           (a, b) => convertTimeStringToNumber(a) - convertTimeStringToNumber(b),
//         )[0],
//       );

//       function convertTimeStringToNumber(timeString) {
//         return Number(timeString.replace(/:/g, '').replace(/0/g, ''));
//       }
//     } else console.log('Permission to store data denied');
//   }

//   return (
//     <TimeContext.Provider value={{time, stopTimer}}>
//       {children}
//     </TimeContext.Provider>
//   );
// }

import React, {createContext, useState, useContext, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from './UserContext';
import {InitializedContext} from './InitializedContext';

export const TimeContext = createContext('00:00:00');

export function TimeContextProvider({children}) {
  const [time, setTime] = useState('00:00:00');
  const [timerIntervals, setTimerIntervals] = useState([]);
  const [user] = useContext(UserContext);
  const [initialized] = useContext(InitializedContext);

  useEffect(() => {
    initialized && startTimer();
    return undefined;
  }, [initialized]);

  function startTimer() {
    let t0, t1, t2, t3, t4, t5;
    t0 = t1 = t2 = t3 = t4 = t5 = 0;
    const updateTime = () => setTime(`${t5}${t4}:${t3}${t2}:${t1}${t0}`);

    setTimeout((_) => {
      setTimerIntervals([
        setInterval(() => {
          t0 = t0 === 9 ? 0 : t0 + 1;
          updateTime();
        }, 10),
        setInterval(() => {
          t1 = t1 === 9 ? 0 : t1 + 1;
          updateTime();
        }, 100),
        setInterval(() => {
          t2 = t2 === 9 ? 0 : t2 + 1;
          updateTime();
        }, 1000),
        setInterval(() => {
          t3 = t3 === 5 ? 0 : t3 + 1;
          updateTime();
        }, 10 * 1000),
        setInterval(() => {
          t4 = t4 === 9 ? 0 : t4 + 1;
          updateTime();
        }, 6 * 10 * 1000),
        setInterval(() => {
          t5 = t5 === 5 ? 0 : t5 + 1;
          updateTime();
        }, 10 * 6 * 10 * 1000),
      ]);
    }, 2600);
  }

  async function stopTimer() {
    timerIntervals.forEach((interval) => clearInterval(interval));

    const permissionGranted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permission to Store Times',
        message: 'Allow SquareMatch to save your times in local storage?',
        buttonPositive: 'Ok',
        buttonNegative: 'No',
        buttonNeutral: 'Ask Later',
      },
    );

    if (permissionGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission to store data received');

      let userData = await AsyncStorage.getItem(user);
      !userData && (await AsyncStorage.setItem(user, '59:59:99'));

      await AsyncStorage.setItem(
        user,
        [userData, time].sort(
          (a, b) => convertTimeStringToNumber(a) - convertTimeStringToNumber(b),
        )[0],
      );

      function convertTimeStringToNumber(timeString) {
        return Number(timeString.replace(/:/g, '').replace(/0/g, ''));
      }
    } else console.log('Permission to store data denied');
  }

  return (
    <TimeContext.Provider value={{time, stopTimer, setTime}}>
      {children}
    </TimeContext.Provider>
  );
}
