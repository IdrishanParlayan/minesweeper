import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import {SoundProvider} from "./src/context/SoundContext";

export default function App() {
  return (
      <SafeAreaProvider>
          <SoundProvider>
              <AppNavigator/>
          </SoundProvider>
      </SafeAreaProvider>
  );
}