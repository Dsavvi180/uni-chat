import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
// import SignUpScreen from './app/SignUpScreen';
// import LoginScreen from './app/LogInScreen';
import HomeScreen from "./app/HomeScreen";
// import * as SecureStore from 'expo-secure-store';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Screen components

function MessagesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Messages Screen</Text>
      <Button
        title="Go to Match"
        onPress={() => navigation.navigate("Matching")}
      />
    </View>
  );
}

function LogInScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LogIn Screen</Text>
      <Button
        title="Go to Match"
        onPress={() => navigation.navigate("Matching")}
      />
    </View>
  );
}

function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SignUp Screen</Text>
      <Button
        title="Go to Match"
        onPress={() => navigation.navigate("Matching")}
      />
    </View>
  );
}

function CapturesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Captures Screen</Text>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

function GroupsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Groups Screen</Text>
    </View>
  );
}

function MatchingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Matching Screen</Text>
    </View>
  );
}

function AllGamesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>All Games Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Groups") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Captures") {
            iconName = focused ? "camera" : "camera-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0038FF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Captures" component={CapturesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator for the bottom tabs and additional screens
const Stack = createStackNavigator();

function AppStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      {/* Bottom tab navigator */}
      <Stack.Screen
        name="BottomTabs"
        options={{ headerShown: false }} // Hide header for bottom tabs
      >
        {(props) => (
          <BottomTabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Stack.Screen>
      {/* Additional screens that are not part of the bottom tab bar */}
      <Stack.Screen name="AllGames" component={AllGamesScreen} />
      <Stack.Screen name="Matching" component={MatchingScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Authentication Flow
function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LogInScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {(props) => <SignUpScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Main App component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Authentication state

  useEffect(() => {
    // GoogleSignin.configure({
    //     webClientId: '1028726147356-i87ss955u62633aa43k3f4vsce5pmvdc.apps.googleusercontent.com',
    // });
    // const getToken = async () => {
    //     const token = await SecureStore.getItemAsync('secure_token');
    //     setIsLoggedIn(token != null);
    // }
    // getToken();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack setIsLoggedIn={setIsLoggedIn} /> // Use the AppStack instead of BottomTabNavigator
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
