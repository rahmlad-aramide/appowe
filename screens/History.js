import { Text, FlatList, SafeAreaView } from "react-native";
import { proverbsCatalog } from "../utils/data";
import { styles } from "./Favorites";
import { truncateString } from "../utils/helper";
import { Loader } from "../components/Loader";
import { Empty } from "../components/Empty";
import { useHistory } from "../contexts/HistoryContext";
import { COLORS } from "../constants";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

const History = ({ navigation }) => {
  const { history } = useHistory();

  const handleSelectProverb = (proverb) => {
    navigation.navigate("Proverb", { proverbId: proverb.id });
  };

  const proverbsHistory = proverbsCatalog.filter((proverb) =>
    history.includes(proverb.id)
  );

  if (!proverbsHistory) {
    return <Loader />;
  }
  if (proverbsHistory?.length === 0) {
    return <Empty text="You don't have any proverb history yet." />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        data={proverbsHistory}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() => handleSelectProverb(item)}
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

export default History;
