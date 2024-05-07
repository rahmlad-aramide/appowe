import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { COLORS, FONT } from '../constants';

export const Empty = ({text="No item here yet."}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.logo}>
        <View style={styles.triangleLeft} />
        <View style={styles.triangleRight} />
      </View>
      <Text style={styles.title}>AppOwe</Text>
      <Text style={styles.subtitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{rotate: '90deg'}],
        marginTop: -StatusBar.currentHeight,
        opacity: 0.5,
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
    title: {
        fontFamily: FONT.rBold,
        fontSize: 16,
        marginTop: 60,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: FONT.rRegular,
    }
  });
  