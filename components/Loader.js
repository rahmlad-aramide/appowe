import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants';

export const Loader = () => {
  const scaleLeft = useRef(new Animated.Value(1)).current;
  const scaleRight = useRef(new Animated.Value(1.2)).current;

  useEffect(() => {
    const pulsingAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleLeft, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(scaleRight, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(scaleLeft, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(scaleRight, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true
          })
        ]),
      ).start();
    };

    pulsingAnimation();
  }, [scaleLeft, scaleRight]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.logo}>
        <Animated.View style={[styles.triangleLeft, { transform: [{ scale: scaleLeft }] }]} />
        <Animated.View style={[styles.triangleRight, { transform: [{ scale: scaleRight }] }]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
    },
    logo: {
      flexDirection: 'row',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{rotate: '90deg'}],
      marginTop: -StatusBar.currentHeight,
    },
    triangleLeft: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 75,
      borderBottomWidth: 75,
      borderLeftColor: COLORS.darkPrimary,
      borderBottomColor: COLORS.transparent,
      position: 'absolute',
      top: -45,
      left: -40,
    },
    triangleRight: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderRightWidth: 75,
      borderTopWidth: 75,
      borderRightColor: COLORS.darkPrimary,
      borderTopColor: COLORS.transparent,
      position: 'absolute',
      bottom: -45,
      right: -40
    },
  });
  