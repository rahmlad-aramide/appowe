import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "./Home";
import History from "./History";
import Favorites from "./Favorites";
import About from "./About";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, icons } from "../constants";

const Drawer = createDrawerNavigator();

export default function Main({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary, height: 80 },
          headerRight: ({}) => (
            <TouchableOpacity style={{marginRight: 14}} onPress={() => navigation.navigate("Search")}>
              <Image source={icons.search} style={styles.drawerLabelIcon} />
            </TouchableOpacity>
          ),
          drawerActiveBackgroundColor: COLORS.transparent,
          drawerActiveTintColor: COLORS.primary,
          drawerInactiveTintColor: COLORS.black,
          drawerStyle: { width: 250, zIndex: 1000 },
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
    </View>
  );
}

function CustomDrawerContent(props) {
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

export const styles = StyleSheet.create({
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
    top: "50%",
    transform: [{ scale: 0.8 }],
    transform: [{ translateY: "-50%" }],
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
    height: undefined,
    width: "90%",
    marginLeft: 20,
    lineHeight: 24,
  },
  overlay: {
    position: "absolute",
    top: 0,
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
    marginBottom: 10,
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
