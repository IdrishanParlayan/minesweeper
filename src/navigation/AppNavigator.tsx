import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";


export type RootStackParamList = {
    Home: undefined;
    Game: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen}/>
              <Stack.Screen name="Game" component={GameScreen} options={{ gestureEnabled: false }}/>
          </Stack.Navigator>
      </NavigationContainer>
    );
}