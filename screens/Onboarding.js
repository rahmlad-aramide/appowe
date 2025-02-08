import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { COLORS, FONT, images } from "../constants";
import { useRef, useState } from "react";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "AppOwe",
    subtitle:
      "Welcome to a world of endless proverb adventures. Get to learn more about the culture.",
    image: images.onboading1,
  },
  {
    id: "2",
    title: "Learn Proverbs with ease",
    subtitle:
      "With AppOwe, learning has been made easy. You can now search and learn about many indigenous proverbs and their origins.",
    image: images.onboading2,
  },
];

export default function Onboarding({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Main", { screen: "Home" });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={handleScroll}
      />

      {/* Pagination Indicators */}
      <View style={styles.indicators}>
        {slides.map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index
                  ? styles.activeIndicator
                  : styles.inactiveIndicator,
              ]}
            />
          );
        })}
      </View>
        <View style={styles.textsContainer}>
            {/* Next Button */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonLabel}>
                {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slide: {
    width,
    alignItems: "center",
  },
  imageContainer: {
    flex: 4 / 5,
    width: "100%",
    marginBottom: 48,
  },
  image: {
    borderBottomLeftRadius: 80,
    height: "100%",
    width: "100%",
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
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 64,
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
  button: {
    marginBottom: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 11.5,
    alignSelf: "flex-end",
  },
  buttonLabel: {
    color: COLORS.black,
    textAlign: "center",
    fontFamily: FONT.osBold,
    fontSize: 16,
  },
});
