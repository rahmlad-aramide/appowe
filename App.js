import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Loader } from "./components/Loader";
import { NavigationContainer } from "@react-navigation/native";

import Onboarding1 from "./screens/Onboarding1";
import Onboarding2 from "./screens/Onboarding2";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./screens/Main";
import ProverbDetails from "./screens/ProverbDetails";
import { SearchProvider } from "./contexts/SearchContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import { FavoritesProvider } from "./contexts/FavoriteContext";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontLoaded] = useFonts({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (!fontLoaded || loading) {
    return <Loader />;
  }

  return (
    <SearchProvider>
      <HistoryProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Onboarding1"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="Onboarding1"
                component={Onboarding1}
              ></Stack.Screen>
              <Stack.Screen
                name="Onboarding2"
                component={Onboarding2}
              ></Stack.Screen>
              <Stack.Screen name="Main" component={Main}></Stack.Screen>
              <Stack.Screen
                name="ProverbDetails"
                component={ProverbDetails}
              ></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </HistoryProvider>
    </SearchProvider>
  );
}
