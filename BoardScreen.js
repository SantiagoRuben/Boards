import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, ImageBackground  } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import firebase from '../firebasedb';
import biblioteca from '../assets/biblioteca.jpg';


class BoardScreen extends Component {
  
  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
    this.ref = firebase.firestore().collection('boards');
    
    this.state = {
      isLoading: true,
      boards: []
    };
  }

   onCollectionUpdate = dataSnapshot => {
    const  boards = [];
    dataSnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        //doc, // DocumentSnapshot
        title,
        description,
        author
      });
    });
 
    this.setState({
      boards,
      isLoading: false,
    });
  };
 
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);    
  }
  

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if(this.state.isLoading){
      return(
         
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ImageBackground
      source={biblioteca}
      style={styles.img}
      >
        <ScrollView style={styles.container}>    
            {
              this.state.boards.map((item, i) => (
                <ListItem
                  containerStyle={styles.lista}
                  key={i}
                  title={item.title}
                  titleStyle={{color: "#fff"}}
                  leftIcon={{name: 'book', type: 'font-awesome', color: "#fff"}}
                  onPress={() => {
                    this.props.navigation.navigate('BoardDetails', {
                      boardkey: item.key,
                    });
                  }}
                />
              ))
            }
        </ScrollView>
      </ImageBackground>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22,

  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img:{
    flex: 1,
    resizeMode: "cover",
  },
  lista:{
    backgroundColor: "transparent",
    borderTopWidth: 2, 

  }
})


export default BoardScreen;