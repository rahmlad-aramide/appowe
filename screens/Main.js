import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import Home from "./Home";
import History from "./History";
import Favorites from "./Favorites";
import About from "./About";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS, FONT, icons } from "../constants";
import { useSearch } from "../contexts/SearchContext";
import { proverbsCatalog } from "../utils/data";
import { truncateString } from "../utils/helper";

const Drawer = createDrawerNavigator();

export default function Main({navigation}) {
  const { searchQuery, setSearchQuery, isDrawerOpen } = useSearch();
  const [suggestions, setSuggestions] = useState([]);

  const handleSelectProverb = (proverb) => {
    if (!proverb || !proverb.id) {
      console.error("Invalid proverb item or missing ID:", proverb);
      Alert.alert(
        "Invalid proverb",
        `Invalid proverb item or missing ID ${proverb.id}`
      );
    }
    navigation.navigate("ProverbDetails", { proverbId: proverb.id });
  };

  const filterProverbs = (query) => {
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
  const renderItem = useCallback(({ item }) => <MyListItem item={item} />, []);

  const MyListItem = React.memo(function MyListItem({ item }) {
    return (
      <Pressable
        style={({pressed})=>[styles.listItemContainer, {opacity: pressed? 0.5 : 1}]}
        onPress={() => handleSelectProverb(item)}
      >
        <Text style={styles.listItemText}>
          {truncateString(item.proverb)?.trim()}
        </Text>
        <Text style={styles.listItemText}>
          {truncateString(item.englishEquivalent)?.trim()}
        </Text>
      </Pressable>
    );
  });

  const keyExtractor = (item, index) => index.toString();

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
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary, height: 80 },
          headerTitle: ({}) => {
            return (
              <View style={styles.inputContainer}>
                <Image source={icons.search} style={styles.inputIcon} />
                <TextInput
                  placeholder="Search AppOwe..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.input}
                />
              </View>
            );
          },
          drawerActiveBackgroundColor: COLORS.transparent,
          drawerActiveTintColor: COLORS.primary,
          drawerInactiveTintColor: COLORS.black,
          drawerStyle: { width: 200, zIndex: 1000 },
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 14,
            fontFamily: FONT.rRegular,
            fontWeight: 400,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: () => (
              <Image source={icons.home} style={styles.drawerLabelIcon} />
            ),
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="History"
          component={History}
          options={{
            drawerIcon: () => (
              <Image source={icons.history} style={styles.drawerLabelIcon} />
            ),
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Favorites"
          component={Favorites}
          options={{
            drawerIcon: () => (
              <Image source={icons.bookmark} style={styles.drawerLabelIcon} />
            ),
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="About"
          component={About}
          options={{
            drawerIcon: () => (
              <Image source={icons.about} style={styles.drawerLabelIcon} />
            ),
          }}
        ></Drawer.Screen>
      </Drawer.Navigator>
      {!isDrawerOpen && suggestions.length > 0 ? (
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
        />
      ) : null}
    </View>
  );
}

function CustomDrawerContent(props) {
  const drawerStatus = useDrawerStatus();
  const { setSearchQuery, setIsDrawerOpen } = useSearch();

  useEffect(() => {
    setSearchQuery("");
    setIsDrawerOpen(drawerStatus === "open");
  }, [drawerStatus]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image source={icons.icon} style={styles.logo} />
        <Text style={styles.logoText}>AppOwe</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginLeft: 20,
    marginTop: 45,
    marginBottom: 28,
    flexDirection: "row",
    gap: 13,
    alignItems: "center",
  },
  logo: {
    width: 26,
    height: 26,
  },
  logoText: {
    fontFamily: FONT.rBold,
    fontSize: 16,
  },
  drawerLabelIcon: { resizeMode: "contain", width: 24, height: 24 },
  inputContainer: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 28,
    top: 4,
    transform: [{ scale: 0.8 }],
  },
  input: {
    backgroundColor: "#ffffff60",
    borderRadius: 16,
    borderWidth: 0.8,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingLeft: 36,
    height: 32,
    width: 228,
    marginLeft: 20,
  },
  overlay: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    zIndex: 1,
    maxHeight: 350,
    height: "auto",
    elevation: 2,
  },
  listItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.gray,
    marginBottom: 8,
    height: 50,
  },
  listItemText: {
    fontFamily: FONT.rRegular,
    fontSize: 14,
  },
  listFooter: {
    height: 16,
  },
});
