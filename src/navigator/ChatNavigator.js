import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Chat from "../screens/Chat";
import Todos from "../screens/Todo";
import EmployeeManagement from "../screens/EmployeeScreen";
import EmployeeForm from "../screens/EmployeeScreen";
import PersonData from "../screens/PersonData/PersonData";
import PersonDetails from "../screens/PersonData/SinglePerson";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName="Employee">
      <Tab.Screen name="PersonData" component={PersonData}/>
      <Tab.Screen name="PersonDetails" component={PersonDetails}/>
      {/* <Tab.Screen name="Chat" component={Chat} /> */}
      <Tab.Screen name="Employee" component={EmployeeManagement} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
