import 'expo-dev-client';
import './gesture-handler'
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Loader } from "./components/Loader";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./screens/Main";
import Search from "./screens/Search";
import { SearchProvider } from "./contexts/SearchContext";
import { HistoryProvider } from "./contexts/HistoryContext";
import { FavoritesProvider } from "./contexts/FavoriteContext";
import Proverb from './screens/Proverb';
import Onboarding from './screens/Onboarding';

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
              initialRouteName="Onboarding"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
              />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Proverb" component={Proverb} />
              <Stack.Screen name="Main" component={Main} />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </HistoryProvider>
    </SearchProvider>
  );
}
