import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { proverbsCatalog } from "../utils/data";
import { COLORS, FONT } from "../constants";
import { handleSelectProverb, truncateString } from "../utils/helper";
import { Loader } from "../components/Loader";
import { Empty } from "../components/Empty";
import { useFavorites } from "../contexts/FavoriteContext";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

const Favorites = ({ navigation }) => {
  const { favorites } = useFavorites();

  const favoriteProverbs = proverbsCatalog.filter((proverb) =>
    favorites.includes(proverb.id)
  );

  if (!favoriteProverbs) {
    return <Loader />;
  }
  if (favoriteProverbs?.length === 0) {
    return <Empty text="No item marked as favorite yet." />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        data={favoriteProverbs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => handleSelectProverb(navigation, item)}
          >
            <Text style={styles.listItemText}>
              {truncateString(item.proverb)?.trim()}
            </Text>
            <Text style={styles.listItemText}>
              {truncateString(item.englishEquivalent)?.trim()}
            </Text>
          </TouchableOpacity>
        )}
        style={[styles.overlay]}
      />
    </SafeAreaView>
  );
};

export default Favorites;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.gray,
    marginBottom: 8,
  },
  listItemText: {
    fontFamily: FONT.rRegular,
    fontSize: 14,
  },
});
