import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';
import detalles from '../assets/detalles.jpg';

class AddBoardScreen extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  saveBoard() {
    this.setState({
      isLoading: true,
    });

    //agregar el documento a la base de datos
    this.ref.add({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      console.log("Document successfully saved!");
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    }); 
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
          source={detalles}
          style={styles.img}
        >
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <TextInput
                style={{color: "#fff"}}
                placeholder={'Title'}
                value={this.state.title}
                onChangeText={(text) => this.updateTextInput(text, 'title')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                style={{color: "#fff"}}
                multiline={true}
                numberOfLines={4}
                placeholder={'Description'}
                value={this.state.description}
                onChangeText={(text) => this.updateTextInput(text, 'description')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                style={{color: "#fff"}}
                placeholder={'Author'}
                value={this.state.author}
                onChangeText={(text) => this.updateTextInput(text, 'author')}
            />
          </View>
          <View style={styles.button}>
            <Button
              large
              leftIcon={{name: 'save'}}
              title='Save'
              onPress={() => this.saveBoard()} />
          </View>
        </ScrollView>
        </ImageBackground>
      );        
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
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
  }
})



export default AddBoardScreen;