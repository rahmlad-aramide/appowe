import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Main";
import Search from "./Search";
import ProverbDetails from "./ProverbDetails";
const Stack = createNativeStackNavigator();
export default function MainStack () {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ProverbDetails" component={ProverbDetails} />
      </Stack.Navigator>
    );
  };