import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { FontAwesome } from "@expo/vector-icons";
import { Switch } from "react-native";
import { spacing, radius } from "../theme/theme";
import {useSettings} from "../context/SettingsContext";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { soundStatus, setSoundStatus } = useSettings();
    const { theme, setTheme } = useSettings();
    const { colors } = useSettings();
    const styles = createStyles(colors);

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
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name={soundStatus === "on" ? "volume-up" : "volume-off"}
                            size={18}
                            color={colors.text}
                        />
                    </View>

                    <Text style={styles.settingLabel}>Sound</Text>

                    <Switch
                        value={soundStatus === "on"}
                        onValueChange={(value) => setSoundStatus(value ? "on" : "off")}
                        trackColor={{ false: "#334155", true: "#6366F1" }}
                        thumbColor={"#fff"}
                    />
                </View>

                <View style={styles.settingRow}>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name={theme === "dark" ? "moon-o" : "sun-o"}
                            size={18}
                            color={colors.text}
                        />
                    </View>

                    <Text style={styles.settingLabel}>Theme</Text>

                    <Switch
                        value={theme === "dark"}
                        onValueChange={(value) => setTheme(value ? "dark" : "light")}
                        trackColor={{ false: "#334155", true: "#6366F1" }}
                        thumbColor={"#fff"}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: spacing.lg,
            justifyContent: "center",
            gap: spacing.xl,
        },

        header: {
            alignItems: "center",
            gap: spacing.lg,
        },

        title: {
            fontSize: 48,
            fontWeight: "900",
            color: colors.text,
        },

        startButton: {
            backgroundColor: colors.primary,
            paddingVertical: 16,
            paddingHorizontal: 40,
            borderRadius: radius.md,
            borderWidth: 1,
            alignItems: "center",
        },

        startText: {
            color: colors.text,
            fontSize: 18,
            fontWeight: "700",
        },

        settingsCard: {
            width: "100%",
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            padding: spacing.lg,
            gap: spacing.md,
            alignItems: "center",
        },

        settingsTitle: {
            color: colors.text,
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
            color: colors.text,
            fontSize: 16,
        },

        iconContainer: {
            width: 24,
            alignItems: "center",
        }
    });