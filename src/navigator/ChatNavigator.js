import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Chat from "../screens/Chat";
import Todos from "../screens/Todo";
import EmployeeManagement from "../screens/EmployeeScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Manage Todos" component={Todos} />
      {/* <Tab.Screen name="Chat" component={Chat} /> */}
      <Tab.Screen name="Employee" component={EmployeeManagement} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
