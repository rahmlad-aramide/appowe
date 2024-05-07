import { StatusBar } from "expo-status-bar";
import { View, Text, Image, SafeAreaView } from "react-native";
import { styles } from "./Onboarding1";
import { images } from "../constants";
import { TouchableOpacity } from "react-native";

export default function Onboarding2({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <Image source={images.onboading2} style={styles.image} />
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.title}>Learn Proverbs with ease</Text>
        <Text style={styles.subtitle}>
          With AppOwe learning has been made easy and you can now search and
          learn about so many indigenous proverbs and their origin.
        </Text>
        <View style={styles.indicators}>
          <TouchableOpacity onPress={() => navigation.navigate("Onboarding1")}>
            <View style={[styles.indicator, styles.inactiveIndicator]}></View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled
            onPress={() => navigation.navigate("Onboarding2")}
          >
            <View style={[styles.indicator, styles.activeIndicator]}></View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Main", { screen: "Home" })}
      >
        <Text style={styles.buttonLabel}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
