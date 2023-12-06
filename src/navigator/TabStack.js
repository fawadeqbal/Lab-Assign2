import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PersonDetails from '../screens/PersonData/SinglePerson'
const Stack=createStackNavigator()
const TabStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='PersonDetails' component={PersonDetails}/>
    </Stack.Navigator>
  )
}

export default TabStack

const styles = StyleSheet.create({})