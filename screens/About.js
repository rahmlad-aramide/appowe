import {
  Alert,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { COLORS, FONT, icons } from "../constants";
import { StatusBar } from "expo-status-bar";

const About = () => {
  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Can't handle URL: ${url}`);
      }
    } catch (error) {
      Alert.alert("An error occurred", error.message);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView style={{ flex: 1 }}>
        <StatusBar backgroundColor={COLORS.primary} />
        <ImageBackground
          style={{ flex: 1, rowGap: 10, marginHorizontal: 10 }}
          source={icons.iconBig}
          imageStyle={{
            resizeMode: "center",
            height: 150,
            top: 250,
            opacity: 0.1,
          }}
        >
          <Text style={{ fontFamily: FONT.rBold, fontSize: 18, marginTop: 10 }}>
            About AppOwe
          </Text>
          <Text>
            The "AppOwe" (Proverbs App{" "}
            <Text style={{ fontStyle: "italic" }}>yor.</Text>) -{" "}
            <Text style={{ fontStyle: "italic" }}>pronounced Apowe</Text> - is
            designed to preserve and promote the Yoruba culture through its rich
            repository of proverbs.
          </Text>
          <Text>
            This app addresses the gradual decline in traditional language usage
            among the younger generation, providing easy access to the wisdom
            embedded in Yoruba proverbs, along with their English equivalents.
          </Text>
          <Text>
            Developed using React Native, the app features daily proverb
            updates, and social sharing capabilities. Also, the app employs
            in-app local storage for personalization features like favouriting
            proverbs and accessing previously accessed proverbs.
          </Text>
          <Text>
            These features make it an essential educational tool for academics,
            researchers, language learners and anyone interested in Yoruba
            culture.
          </Text>
          <Text>
            The inclusion of English translations helps non-native speakers and
            scholars to better understand and utilize these proverbs in their
            academic and personal development.
          </Text>
          <Text>
            The application contributes to the sustainable development goal
            (SDG) of Quality Education by enhancing linguistic and cultural
            education.
          </Text>
          <Text>
            Additionally, the app offers economic advantages by fostering a
            greater understanding among tourists and business professionals
            visiting Yoruba-speaking regions, thus improving communication and
            cultural exchange.
          </Text>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text>
              Brought to you by the AppOwe Team. Developed by{" "}
              <Text
                style={{
                  color: "blue",
                  textDecorationLine: "underline",
                }}
                onPress={() => openLink("https://abdrahman-oladimeji.web.app")}
              >
                Abdrahman Oladimeji (Rahmlad)
              </Text>{" "}
              ©️ 2024
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
