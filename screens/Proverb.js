import { 
    Text,
  StyleSheet,
  Image,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
 } from "react-native";
import { COLORS, FONT, icons } from "../constants";
import { useEffect, useState } from "react";
import { proverbsCatalog } from "../utils/data";
import { useHistory } from "../contexts/HistoryContext";
import { useFavorites } from "../contexts/FavoriteContext";
import { shareProverb } from "../utils/helper";

const Proverb = ({ navigation, route }) => {
    const { proverbId } = route.params;
    const { favorites, addFavorite, removeFavorite } = useFavorites();
      const { addProverbIdToHistory } = useHistory();
      const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (!proverbId) {
          console.error("No proverb ID provided");
          navigation.goBack();
        }
      }, [navigation, proverbId]);

      useEffect(() => {
          const isFavorite = async () => {
            return setFavorite(favorites.includes(proverbId));
          };
          isFavorite();
        }, []);
      
        useEffect(() => {
          addProverbIdToHistory(proverbId);
        }, [proverbId]);

      const selectedProverb = proverbsCatalog.find((p) => p.id == proverbId);
  
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <ScrollView style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={icons.iconBig}
          imageStyle={{
            resizeMode: "center",
            height: 150,
            top: "75%",
            opacity: 0.1,
          }}
        >
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
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.title}>{selectedProverb?.proverb}</Text>
            </View>
            <View>
              <Text style={styles.heading}>Translation</Text>
              <Text style={styles.content}>
                {selectedProverb?.meaning?.trim()}
              </Text>
            </View>
            <View>
              <Text style={styles.heading}>Meaning</Text>
              <Text style={styles.content}>
                {selectedProverb?.englishEquivalent?.trim()}
              </Text>
            </View>
            { selectedProverb?.details ? 
            <View>
              <Text style={styles.heading}>Explanation</Text>
              <Text style={styles.content}>
                {selectedProverb.details.trim()}
              </Text>
            </View>
            : null }
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteBtn: {
    height: 24,
    marginLeft: -20,
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
    marginVertical: 16,
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

export default Proverb;
