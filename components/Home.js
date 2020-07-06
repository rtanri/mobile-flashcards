// import React, {Component} from 'react'
// import {View, Text, SafeAreaView, StyleSheet} from 'react-native'

// import {connect} from 'react-redux'
// import {fetchAllDecksAction} from '../actions/index'

// import Deck from './Deck'
// import {FlatList} from 'react-native-gesture-handler'
// import {white, red, lightPurp} from '../utils/colors'

// class Home extends Component {
//     componentDidMount() {
//         this.props.fetchAllDecksAction();
//     }

//     render(){
//         const { decks } = this.props;

//         return(
//             <>
//             {decks.length > 0
//                 ? ( 
//                     <SafeAreaView style={styles.container}>
//                         <FlatList 
//                             data={decks}
//                             renderItem = {({item}) => <Deck deck={item} />}
//                             keyExtractor={({item}) => item.id}
//                         />
//                     </SafeAreaView> 
//                   ) : (
//                     <View style={styles.container}>
//                         <View style={styles.center}>
//                             <Text style={styles.cardTitle}>No Decks Found</Text>
//                         </View>
//                     </View>
//                   ) 
//             }
//         </>
//         );
//     }
// }

// const mapStateToProps = ({ decks }) => 
//     ({ decks: decks.allDecks });

// const mapDispatchToProps = (dispatch) => ({
//   fetchAllDecksAction: () => dispatch(fetchAllDecksAction()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Home);



// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: lightPurp,
//         padding: 20,
//         justifyContent: 'center',
//     },
//     center: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: 30,
//         marginRight: 30,
//     },
//     cardTitle: {
//         fontSize: 30,
//         paddingTop: 20,
//         paddingBottom: 20,
//         textAlign: 'center',
//     }
// });
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { handleInitialData, clearInitialDecks } from '../actions';
import Deck from './Deck';
import { removeDecks } from '../utils/api'
import { blue } from '../utils/colors'


class Home extends Component{
    componentDidMount (){
        const { dispatch } = this.props
        dispatch(handleInitialData())
    };
    clear = () => {
        this.props.dispatch(clearInitialDecks())
        removeDecks()
        this.props.dispatch(handleInitialData())
      };
    render(){
        const { decks, isDummyData, navigation } = this.props;
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
                
                {!isDummyData
                ? (
                    <TouchableOpacity onPress={this.clear}>
                        <Text style={styles.resetTxt}>RESET</Text>
                    </TouchableOpacity>
                    )
                : null
                }
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
        isDummyData: decks && Object.keys(decks).length === 3,
    };
};


export default connect(mapStateToProps)(Home);