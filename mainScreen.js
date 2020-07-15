import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import logo from '../assets/logo.jpg';
import {LinearGradient} from 'expo-linear-gradient'


class mainScreen extends Component {
	constructor(){
		super();
	}

	render(){
	  return (

	 <View style={styles.container}>
	    <LinearGradient
		 colors={['#EEAB74', 'transparent']}
		>
		      <Text style={styles.header}>
		      	Bienvenido(a)
		      </Text>

		      <Image style={styles.image} source={logo}/>

		      <Button 
		              large
		              backgroundColor={'#CCCCCC'}
		              title='Siguiente'
		              onPress={() => {
		               this.props.navigation.navigate('Board');
		              }} />
	     </LinearGradient>
	    </View>
	
	  );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD5C5C',

  },
  header:{
  	marginLeft:30,
  	marginTop: 30,
  	color: '#090976',   
  	fontWeight:'bold',
  	fontSize: 35,
  	fontStyle: 'italic',
  	fontFamily:'sans-serif'
  },
  image:{
  	marginTop: 70,
  	resizeMode: "contain",
  	marginBottom: 100,
  },
});

export default mainScreen;