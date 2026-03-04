import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();


    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <View>
                <Text style={styles.title}>Minesweeper</Text>
                <Pressable style={styles.startButton} onPress={() => navigation.navigate("Game")}>
                    <Text style={styles.startText}>Start Game</Text>
                </Pressable>
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
    },

    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 40,
        fontWeight: "800",
        marginBottom: 40,
    },

    startButton: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    startText: {
        fontSize: 18,
        fontWeight: "700",
    },
});