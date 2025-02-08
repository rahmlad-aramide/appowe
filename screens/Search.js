import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, icons } from "../constants";
import { styles } from "./Main";
import { useSearch } from "../contexts/SearchContext";
import { StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { truncateString } from "../utils/helper";
import { proverbsCatalog } from "../utils/data";

const Search = ({ navigation }) => {
  let height = StatusBar.currentHeight;
  const { searchQuery, setSearchQuery } = useSearch();
  const [suggestions, setSuggestions] = useState([]);


  const handleSelectProverb = (proverb) => {
    if (!proverb || !proverb.id) {
      console.error("Invalid proverb item or missing ID:", proverb);
      Alert.alert(
        "Invalid proverb",
        `Invalid proverb item or missing ID ${proverb.id}`
      );
      return;
    }
    if (!navigation) {
      console.error("Navigation prop is missing");
      return;
   }
    // navigation.navigate("Proverb", { proverbId: 4 });
    navigation.navigate("Proverb", { proverbId: proverb.id });
  };

  const filterProverbs = (query) => {
    if (!Array.isArray(proverbsCatalog)) {
       console.error("proverbsCatalog is not an array:", proverbsCatalog);
       return [];
    }
    if (query && query.length > 1) {
       const lowercasedQuery = query.toLowerCase();
       return proverbsCatalog.filter(
          (item) =>
             item.proverb.toLowerCase().includes(lowercasedQuery) ||
             item.englishEquivalent.toLowerCase().includes(lowercasedQuery)
       );
    } else {
       return [];
    }
 };
 

  const ITEM_HEIGHT = 50;
  const renderItem = useCallback(({ item }) => <MyListItem item={item} />, [handleSelectProverb]);

  const MyListItem = React.memo(function MyListItem({ item }) {
    return (
      <TouchableOpacity
      style={{
        ...styles.listItemContainer,
        opacity: 1,
     }}
        onPress={() => handleSelectProverb(item)}
      >
        <Text style={styles.listItemText}>
          {truncateString(item.proverb)?.trim()}
        </Text>
        <Text style={styles.listItemText}>
          {truncateString(item.englishEquivalent)?.trim()}
        </Text>
      </TouchableOpacity>
    );
  });

  const keyExtractor = (_, index) => index.toString();

  const ListFooterComponent = () => <View style={styles.listFooter}></View>;

  useEffect(() => {
    if (searchQuery) {
      const filteredSuggestions = filterProverbs(searchQuery);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={[styles.inputContainer, { marginTop: height + 20 }]}>
        <Image source={icons.search} style={styles.inputIcon} />
        <TextInput
          placeholder="Search AppOwe..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            flex: 1,
            rowGap: 10,
            marginHorizontal: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={icons.iconBig}
          imageStyle={{
            resizeMode: "center",
            height: 150,
            top: 250,
            opacity: 0.1,
          }}
        >
          <Text
            style={{
              fontFamily: FONT.rBold,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Which proverb would you like to learn about?
          </Text>
        </ImageBackground>
        {suggestions.length > 0 ? (
          <FlatList
            data={suggestions}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListFooterComponent={ListFooterComponent}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            windowSize={7}
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            style={[styles.overlay]}
            ItemSeparatorComponent={() => (
              <View style={{ flex: 1 }} />
            )}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Search;
