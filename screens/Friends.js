import React, { Component } from "react";
import { StyleSheet, 
         Text, 
         View,  
         Image, 
         ScrollView, 
         Button,
         SafeAreaView,
         Alert,
         TouchableOpacity,
         FlatList } from "react-native";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import { color } from "react-native-reanimated";



export default class Friends extends Component {

    constructor(props) {
        super(props);
        this.state = {nameList:[], isLoaded: false};
    }
    
    render() {
        
        var usersRef = firebase.database().ref('users/');
        
        if (!this.state.isLoaded) {
            usersRef.once('value', (snapshot) => {
                var curr = [];
    
                
                    snapshot.forEach((childSnapshot) => {
    
                        var name = childSnapshot.val().first_name;
                        //var curr = this.state.nameList;
                        curr.push(name);
                        this.setState({nameList: curr});
                    }
                    
                    );
   
            });

            this.setState({isLoaded: true})
        }
        
        
        
        return(
            <View style={styles.container}>
                <ScrollView>
                    {this.state.nameList.map((item) => {
                        return (
                            <View style={styles.itembox}>
                                <Text style={styles.item}>{item}</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.props.navigation.navigate('Alarm')}
                                >
                                    <Text style={styles.text}>Request
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: '2%',
      padding: 10,
      backgroundColor: "white"
 
    },

    itembox: {
        flexDirection: 'row',
        backgroundColor: '#e5e2f6',
        margin: 10,
        borderRadius: 20
        //justifyContent: "center",
        
    },

    item: {
        paddingVertical: 20,
        marginLeft: 20,
        marginRight: '40%',
        fontSize: 30,
        fontFamily: 'Baskerville',
        color: 'black',
    },

    button: {
        width: 90,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 30,
        //marginLeft: 200,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
        
    },
  });