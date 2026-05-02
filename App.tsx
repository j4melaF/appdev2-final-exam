import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";
import { Id } from "./convex/_generated/dataModel";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import TodoScreen from "./screens/TodoScreen";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL!,
  {
    unsavedChangesWarning: false,
  }
);

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Todo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          
          {/* LOGIN */}
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                onLogin={(id: Id<"users">) => {
                  setUserId(id);
                  props.navigation.navigate("Todo");
                }}
              />
            )}
          </Stack.Screen>

          {/* SIGNUP */}
          <Stack.Screen name="Signup" component={SignupScreen} />

          {/* TODO */}
          <Stack.Screen name="Todo">
            {(props) =>
              userId ? (
                <TodoScreen {...props} userId={userId} />
              ) : (
                props.navigation.navigate("Login")
              )
            }
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}