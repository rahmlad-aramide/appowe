import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { proverbsCatalog } from "../utils/data";
import { COLORS, FONT, icons } from "../constants";
import { Loader } from "../components/Loader";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const [dailyProverb, setDailyProverb] = useState(null);

  useEffect(() => {
    const fetchProverb = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const storedDate = await AsyncStorage.getItem("date");

      if (storedDate !== today) {
        const randomProverb =
          proverbsCatalog[Math.floor(Math.random() * proverbsCatalog.length)];
        await AsyncStorage.setItem(
          "dailyProverbId",
          JSON.stringify(randomProverb.id)
        );
        await AsyncStorage.setItem("date", today);
        setDailyProverb(randomProverb);
      } else {
        const storedProverbId = JSON.parse(
          await AsyncStorage.getItem("dailyProverbId")
        );
        const storedProverb = proverbsCatalog.find(
          (proverb) => proverb.id === storedProverbId
        );
        setDailyProverb(storedProverb);
      }
    };
    fetchProverb();
  }, []);

  if (!dailyProverb) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ImageBackground
        style={{ flex: 1 }}
        source={icons.iconBig}
        imageStyle={{
          resizeMode: "center",
          height: 150,
          top: 250,
          opacity: 0.1,
        }}
      >
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>Proverb of the Day</Text>
            <Text style={styles.subtitle}>{dailyProverb?.proverb?.trim()}</Text>
          </View>
          {dailyProverb?.meaning ? (
            <View>
              <Text style={styles.heading}>Translation</Text>
              <Text style={styles.content}>
                {dailyProverb?.meaning?.trim()}
              </Text>
            </View>
          ) : null}
          {dailyProverb?.englishEquivalent ? (
            <View>
              <Text style={styles.heading}>Meaning</Text>
              <Text style={styles.content}>
                {dailyProverb?.englishEquivalent?.trim()}
              </Text>
            </View>
          ) : null}
          {dailyProverb?.details ? (
            <View>
              <Text style={styles.heading}>Explanation</Text>
              <Text style={styles.content}>
                {dailyProverb?.details?.trim()}
              </Text>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: FONT.rBold,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: FONT.rRegular,
  },
  heading: {
    fontFamily: FONT.rBold,
    fontSize: 14,
    marginBottom: 6,
  },
  contentContainer: {
    gap: 12,
    marginVertical: 20,
    marginHorizontal: 12,
    alignSelf: "flex-start",
  },
  content: {
    fontSize: 16,
    fontFamily: FONT.rRegular,
    marginBottom: 5,
  },
});
