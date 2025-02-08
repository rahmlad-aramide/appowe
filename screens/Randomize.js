import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { proverbsCatalog } from "../utils/data";
import { COLORS, FONT, icons } from "../constants";
import { Loader } from "../components/Loader";
import { StatusBar } from "expo-status-bar";

export default function Randomize() {
  const [randomProverb, setRandomProverb] = useState(null);

  const getRandomProverb = () => {
    const randomIndex = Math.floor(Math.random() * proverbsCatalog.length);
    return proverbsCatalog[randomIndex];
  };
  
  useEffect(()=> {
    setRandomProverb(getRandomProverb());
  }, [])

  if (!randomProverb) {
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Text style={styles.title}>Randomly Selected Proverb</Text>
            <TouchableOpacity onPress={() => setRandomProverb(getRandomProverb())}>
              <Image source={icons.randomize} style={{ height: 20, resizeMode: 'center'}} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.subtitle}>{randomProverb?.proverb?.trim()}</Text>
          </View>
          {randomProverb?.meaning ? (
            <View>
              <Text style={styles.heading}>Translation</Text>
              <Text style={styles.content}>
                {randomProverb?.meaning?.trim()}
              </Text>
            </View>
          ) : null}
          {randomProverb?.englishEquivalent ? (
            <View>
              <Text style={styles.heading}>Meaning</Text>
              <Text style={styles.content}>
                {randomProverb?.englishEquivalent?.trim()}
              </Text>
            </View>
          ) : null}
          {randomProverb?.details ? (
            <View>
              <Text style={styles.heading}>Explanation</Text>
              <Text style={styles.content}>
                {randomProverb?.details?.trim()}
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
