import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const FadingView = ({style, children, hiding, hide}) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 300,
    }).start();
  }, [fadeInAnim]);

  useEffect(() => {
    hiding &&
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 300,
      }).start(hide);
  }, [hiding]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: hiding ? fadeOutAnim : fadeInAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  );
};

export default FadingView;
