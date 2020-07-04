import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {Ionicons, FontAwesome} from '@expo/vector-icons'

import Home from './components/Home'
import AddDecks from './components/AddDecks'

import {white, purple} from './utils/colors'



const RouteConfigs = {
    Home: {
        name:"Home",
        component: Home,
        options:{title: "Decks"}
    },
    AddDecks: {
        name:"Add Decks",
        component: AddDecks,
        option:{title: "Add Decks"}
    }
}


const Tab = Platform.OS === 'ios' 
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

export default class MainApp extends React.Component {
  render() {
    return (
        <SafeAreaView style ={{flex:1}}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen {...RouteConfigs['Home']} />
                    <Tab.Screen {...RouteConfigs['AddDecks']} />
                </Tab.Navigator>
            </NavigationContainer>

        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
