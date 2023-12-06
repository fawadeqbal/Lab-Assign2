import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./src/navigator/Navigator";
import TabNavigator from "./src/navigator/ChatNavigator";
export default function App() {
  return (
  <NavigationContainer>
    {/* <AuthStackNavigator/> */}
    <TabNavigator/>
  </NavigationContainer>
  );
}


