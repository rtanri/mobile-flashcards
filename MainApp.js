import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StatusBar, Platform, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Constants  from 'expo-constants'



import { white, purple } from './utils/colors'
import middleware from './middleware'
import reducer from './reducers'

import Home from './components/Home'
import AddDeck from './components/AddDeck'
import DeckSetting from './components/DeckSetting'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'


function FlashcardStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// Config for TabNav
const RouteConfigs = {
  Home:{
    name: "Home",
    component: Home,
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name="list" size={24} color={tintColor} />, title: 'Home'}
  }, 
  AddDeck:{
    component: AddDeck,
    name: "Add Deck",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 100,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
  };

const Tab = Platform.OS === 'ios'
        ? createBottomTabNavigator() 
        : createMaterialTopTabNavigator()

const TabNav = () =>(

    <Tab.Navigator {...TabNavigatorConfig}>
        <Tab.Screen {...RouteConfigs['Home']} />
        <Tab.Screen {...RouteConfigs['AddDeck']} />
    </Tab.Navigator>
)

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
}
const StackConfig = {
  TabNav:{
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  }, 
  DeckSetting:{
    name: "DeckSetting",
    component: DeckSetting,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      //headerTitleAlign: 'center',
      title: 'Deck View'
    }
  },
  AddCard:{
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      }
    }
  },
  Quiz:{
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      title: 'Quizing'
    }
  }
}
const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckSetting']} />
    <Stack.Screen {...StackConfig['AddCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
  </Stack.Navigator>
)


// App
export default class MainApp extends Component {
  render(){
    const store = createStore(reducer, middleware)

    return (

        <Provider store = {store}>
          <View style={{flex: 1}}>
            <FlashcardStatusBar backgroundColor={purple} barStyle='light-content' />
              <NavigationContainer>
                <MainNav />
              </NavigationContainer>
          </View>
        </Provider>
      );
    }
}


// import React from 'react';
// import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
// import {createStackNavigator} from '@react-navigation/stack'
// import {Ionicons, FontAwesome} from '@expo/vector-icons'

// import {createStore} from 'redux'
// import {Provider} from 'react-redux'
// import reducer from './reducers'
// import middleware from './middleware'

// import Deck from './components/Deck'
// import Home from './components/Home'
// import AddDeck from './components/AddDeck'

// import {white, purple, green, orange} from './utils/colors'


// //1. Setting for TabNavigations

// const Tab = Platform.OS === 'ios' 
//     ? createBottomTabNavigator()
//     : createMaterialTopTabNavigator()

// const RouteConfigs = {
//     Home: {
//         name:"Home",
//         component: Home,
//         options:{tabBarIcon: ({tintColor}) => 
//          <FontAwesome name="list" size={24} color={tintColor} /> ,title: "Decks"}
//     },
//     AddDecks: {
//         name:"Add Deck",
//         component: AddDeck,
//         options:{tabBarIcon: ({tintColor}) => 
//           <FontAwesome name="plus-square" size={24} color={tintColor} /> ,
//           title: "AddDeck"}
//     }
// }

// const TabNavigatorConfig ={
//   navigationsOptions: {
//     header: null,
//   },
//   tabBarOptions:{
//     activeTintColor: Platform.OS === "ios" ? purple : white,
//     style: {
//       backgroundColor: Platform.OS === "ios" ? white : purple,
//       shadowColor: "rgba(0,0,0,0.24",
//       shadowOffset: {
//         width: 0,
//         height: 3,
//       },
//       shadowRadius: 6,
//       shadowOpacity: 1,
//     }
//   },
// }

// const TabNav = () => {
//   return(
//     <Tab.Navigator {...TabNavigatorConfig}>
//           <Tab.Screen {...RouteConfigs['Home']} />
//           <Tab.Screen {...RouteConfigs['AddDecks']} />
//     </Tab.Navigator>
//   )
// }


// //2. Setting for StackNavigations

// const Stack = createStackNavigator();

// const StackConfig = {
//   TabNav: {
//     name: "Home",
//     component: TabNav,
//     options:{
//       headerTintColor: white,
//       headerStyle: {
//         backgroundColor: purple,
//       },
//     title: "Home",
//     }
//   },
//   AddDeck:{
//     name:"Add Deck",
//     component: AddDeck,
//     options:{
//       headerTintColor: white,
//       headerStyle:{
//         backgroundColor: purple,
//       },
//     title: "Add Deck",
//     },
//   },
// }

// const MainNav = () => {
//   return(
//     <Stack.Navigator>
//       <Stack.Screen {...StackConfig['TabNav']} />
//       <Stack.Screen {...StackConfig['AddDeck']} />
//     </Stack.Navigator>
//   )
// }



// export default class MainApp extends React.Component {
//   render() {
//     const store = createStore(reducer, middleware);
//     return (
//       <Provider store={store} >
//         <SafeAreaView style ={{flex:1}}>

//             <NavigationContainer>
//               <MainNav />
//             </NavigationContainer>

//         </SafeAreaView>
//       </Provider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });