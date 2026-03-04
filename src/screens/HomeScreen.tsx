import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useSound} from "../context/SoundContext";
import { FontAwesome } from "@expo/vector-icons";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { soundStatus, setSoundStatus } = useSound();

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.title}>Minesweeper</Text>

                <Pressable
                    style={styles.startButton}
                    onPress={() => navigation.navigate("Game")}
                >
                    <Text style={styles.startText}>Start Game</Text>
                </Pressable>
            </View>

            <View style={styles.settingsCard}>
                <Text style={styles.settingsTitle}>Settings</Text>

                <View style={styles.settingRow}>
                    <FontAwesome  name={soundStatus === "on" ? "volume-up" : "volume-off"} size={18} color="black"/>

                    <Text style={styles.settingLabel}>Sound</Text>

                    <Pressable
                        style={ [styles.toggleButton, soundStatus === "on" && styles.toggleActive] }
                        onPress={() => setSoundStatus(soundStatus === "on" ? "off" : "on") }
                    >
                        <Text style={styles.toggleText}> {soundStatus === "on" ? "ON" : "OFF"}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
    },

    header: {
        alignItems: "center",
        gap: 20,
    },

    title: {
        fontSize: 40,
        fontWeight: "800",
    },

    startButton: {
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    startText: {
        fontSize: 18,
        fontWeight: "700",
    },

    settingsCard: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 18,
        padding: 20,
        gap: 16,
    },

    settingsTitle: {
        fontSize: 18,
        fontWeight: "700",
    },

    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    settingLabel: {
        flex: 1,
        fontSize: 16,
    },

    toggleButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
    },

    toggleActive: {
        opacity: 0.7,
    },

    toggleText: {
        fontWeight: "700",
    },
});