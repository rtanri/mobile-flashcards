import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions';
import Deck from './Deck';
import { blue } from '../utils/colors'


class Home extends Component{
    componentDidMount (){
        const { dispatch } = this.props
        dispatch(handleInitialData())
    };

    render(){
        const { decks, navigation } = this.props;
        return(
            <ScrollView style={styles.container}>
                {decks && Object.keys(decks).map((key) =>{
                    const {title, questions } = decks[key]
                    return (<TouchableOpacity 
                            key={key}
                            onPress={() => navigation.navigate(
                                "DeckSetting",
                                {title: key}
                            )}>
                        <Deck 
                            title={title}
                            count={questions.length} />
                    </TouchableOpacity>)
                })}

            </ScrollView>
        );
    };
};

const styles = StyleSheet.create({
    container:{
        alignSelf: 'stretch',
        padding: 10,
    },
    resetTxt: {
        color: blue,
        fontSize: 18,
        marginTop: 20,
        marginBottom: 30,
        fontWeight: '300',
    }
});

function mapStateToProps ({decks}){
    return{
        decks,
    };
};


export default connect(mapStateToProps)(Home);