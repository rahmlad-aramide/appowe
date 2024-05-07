import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { COLORS, FONT, images } from "../constants";
import { TouchableOpacity } from "react-native";

export default function Onboarding1({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={() => navigation.navigate("Main", { screen: "Home" })}
        >
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
        <Image source={images.onboading1} style={styles.image} />
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.title}>AppOwe</Text>
        <Text style={styles.subtitle}>
          Welome to a world of endless proverb adventures, get to learn more
          about the culture.
        </Text>
        <View style={styles.indicators}>
          <TouchableOpacity
            disabled
            onPress={() => navigation.navigate("Onboarding1")}
          >
            <View style={[styles.indicator, styles.activeIndicator]}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Onboarding2")}>
            <View style={[styles.indicator, styles.inactiveIndicator]}></View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Onboarding2")}
      >
        <Text style={styles.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    flex: 4 / 5,
    marginBottom: 48,
    position: "relative",
  },
  image: {
    borderBottomLeftRadius: 80,
    height: "100%",
    width: "100%",
  },
  skip: {
    color: COLORS.white,
  },
  skipContainer: {
    position: "absolute",
    right: 22,
    bottom: 20,
    zIndex: 10,
    fontSize: 16,
    marginTop: 36,
    fontFamily: FONT.osRegular,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 40,
    marginBottom: 32,
  },
  indicator: {
    width: 29,
    height: 6,
    borderRadius: 6,
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
  },
  inactiveIndicator: {
    width: 6,
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textsContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONT.rBold,
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: FONT.osRegular,
    fontSize: 16,
  },
  button: {
    marginHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 11.5,
    marginVertical: "auto",
    alignSelf: "flex-end",
  },
  buttonLabel: {
    color: COLORS.black,
    textAlign: "center",
    fontFamily: FONT.osBold,
    fontSize: 16,
  },
});
