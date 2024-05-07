import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import NetInfo from "@react-native-community/netinfo";
import {
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  View,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { proverbsCatalog } from "../utils/data";
import {
  extractTranslatedParts,
  headingTranslations,
  shareProverb,
  translateText,
} from "../utils/helper";
import { COLORS, FONT, icons } from "../constants";
import { useFavorites } from "../contexts/FavoriteContext";
import { useHistory } from "../contexts/HistoryContext";
import { TouchableOpacity } from "react-native";

const languagesData = [
  {
    label: "French",
    value: "fr_XX",
  },
  {
    label: "Spanish",
    value: "es_XX",
  },
  {
    label: "Portuguese",
    value: "pt_XX",
  },
  {
    label: "German",
    value: "de_DE",
  },
];
export default function ProverbDetails({ route }) {
  const { proverbId } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { addProverbIdToHistory } = useHistory();
  const [translation, setTranslation] = useState("");
  const [translating, setTranslating] = useState(false);
  const [language, setLanguage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!proverbId) {
      console.error("No proverb ID provided");
      navigation.goBack();
    }
  }, [proverbId]);

  useEffect(() => {
    const isFavorite = async () => {
      return setFavorite(favorites.includes(proverbId));
    };
    isFavorite();
  }, []);

  useEffect(() => {
    addProverbIdToHistory(proverbId);
  }, [proverbId]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const selectedProverb = proverbsCatalog.find((p) => p.id === proverbId);

  const handleTranslate = async (targetLang) => {
    const textToTranslate = `${selectedProverb.meaning} ||| ${selectedProverb.englishEquivalent} ||| ${selectedProverb.details}`;
    if (targetLang === null) {
      Alert.alert(
        "No language selected",
        "Please select a language you want to translate to above."
      );
      return;
    }
    if (!isConnected) {
      Alert.alert(
        "No internet connection",
        "Please check your internet connection and try again."
      );
      return;
    }

    setTranslating(true);
    try {
      const response = await translateText(textToTranslate, targetLang);
      if (response.error) {
        Alert.alert("Translation Error", response.error);
      } else {
        const parts = extractTranslatedParts(response.result);
        setTranslation(parts);
        setCurrentLanguage(targetLang);
      }
    } catch (e) {
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setTranslating(false);
    }
  };

  if (!selectedProverb) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={icons.iconBig}
          imageStyle={{
            resizeMode: "center",
            height: 150,
            top: "25%",
            opacity: 0.1,
          }}
        >
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Language", value: null }}
              style={styles.pickerStyle}
              Icon={() => {
                return (
                  <Image
                    source={icons.arrowDown}
                    style={{ resizeMode: "contain", height: 24 }}
                  />
                );
              }}
              onValueChange={(value) => {
                setLanguage(value);
              }}
              items={languagesData}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={() => {
                  favorite ? removeFavorite(proverbId) : addFavorite(proverbId);
                  setFavorite(!favorite);
                }}
              >
                <Image
                  source={favorite ? icons.heart : icons.heartOutline}
                  style={[
                    styles.favoriteIcon,
                    {
                      height: favorite ? 30 : 24,
                      marginTop: favorite ? -4 : 0,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shareBtn}
                onPress={() => shareProverb(selectedProverb)}
              >
                <Image source={icons.share} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.title}>{selectedProverb?.proverb}</Text>
            </View>
            <View>
              <Text style={styles.heading}>Meaning</Text>
              <Text style={styles.content}>
                {selectedProverb?.meaning?.trim()}
              </Text>
            </View>
            <View>
              <Text style={styles.heading}>English</Text>
              <Text style={styles.content}>
                {selectedProverb?.englishEquivalent?.trim()}
              </Text>
            </View>
            { selectedProverb?.details ? 
            <View>
              <Text style={styles.heading}>Details</Text>
              <Text style={styles.content}>
                {selectedProverb.details.trim()}
              </Text>
            </View>
            : null }
          </View>
          <TouchableOpacity
            onPress={() => {
              handleTranslate(language);
            }}
            disabled={translating}
            style={styles.translateButton}
          >
            {language === null ? (
              <Text>Select a language</Text>
            ) : (
              <Text>
                {translating ? (
                  <ActivityIndicator />
                ) : (
                  `Translate to ${headingTranslations[language]?.englishEquivalent}`
                )}
              </Text>
            )}
          </TouchableOpacity>
          {translation ? (
            <View style={[styles.contentContainer, { paddingBottom: 20 }]}>
              <Text style={styles.title}>
                {headingTranslations[currentLanguage]?.translation} (Translation
                in {headingTranslations[currentLanguage]?.englishEquivalent})
              </Text>
              {translation?.meaning && (
                <View>
                  <Text style={styles.heading}>
                    {headingTranslations[currentLanguage]?.meaning}
                  </Text>
                  <Text style={styles.content}>
                    {translation?.meaning?.trim()}
                  </Text>
                </View>
              )}
              {translation?.englishEquivalent && (
                <View>
                  <Text style={styles.heading}>
                    {headingTranslations[currentLanguage]?.englishEquivalent}
                  </Text>
                  <Text style={styles.content}>
                    {translation?.englishEquivalent?.trim()}
                  </Text>
                </View>
              )}
              {translation?.details && (
                <View>
                  <Text style={styles.heading}>
                    {headingTranslations[currentLanguage]?.details}
                  </Text>
                  <Text style={styles.content}>
                    {translation?.details?.trim()}
                  </Text>
                </View>
              )}
            </View>
          ) : null}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerStyle: {
    inputAndroid: {
      backgroundColor: COLORS.primary,
      width: 120,
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginTop: 16,
      marginBottom: 24,
      color: COLORS.black,
      fontFamily: FONT.osBold,
      fontSize: 12,
    },
    iconContainer: {
      top: 24,
      left: 78,
    },
    placeholder: {
      color: COLORS.black,
    },
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  favoriteBtn: {
    height: 24,
  },
  shareBtn: {
    height: 24,
  },
  shareIcon: {
    marginTop: -2,
    resizeMode: "contain",
    height: 24,
  },
  favoriteIcon: {
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: FONT.rBold,
  },
  heading: {
    fontFamily: FONT.rBold,
    fontSize: 14,
    marginBottom: 6,
  },
  contentContainer: {
    gap: 12,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    fontFamily: FONT.rRegular,
    marginBottom: 5,
  },
  translateButton: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    padding: 12,
    alignSelf: "center",
    elevation: 5,
    marginBottom: 20,
  },
});
