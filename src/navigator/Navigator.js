import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/Signin";
import Signup from '../screens/Signup'
import ForgotPassword from "../screens/ResetPassword";
import TabNavigator from "./ChatNavigator";
const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Reset Password" component={ForgotPassword} />
      <Stack.Screen name="TabNavigator" component={TabNavigator}/>
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
