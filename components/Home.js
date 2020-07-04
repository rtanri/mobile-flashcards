import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {white} from '../utils/colors'

export default class Home extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Home Page</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
