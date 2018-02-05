import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions } from "react-native";

import auth0 from '../auth0';
import { login, register } from "../Actions/actionCreator";
import {validateInput} from '../utils'

const width = Dimensions.get('window').width/1.5

class LoginScreen extends Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    username:'',
    password:''
  }

  auth0_login = () => {
    auth0
    .webAuth
    .authorize({scope: 'openid profile email', audience: 'https://chicmic-demo.auth0.com/userinfo'})
    .then(credentials =>{
      if(credentials.accessToken && credentials.accessToken !== null){
        this.props.login()
      }
    })
    .catch(error => console.log(error));
  }

  navigateToRegisterScreen = () => {
      this.props.register();
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.textStyles}>Auth0 authentication / Login</Text>
        <TouchableOpacity
          onPress={this.auth0_login}
          style={styles.touchableStyles}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text
          onPress={this.navigateToRegisterScreen}
          style={styles.registerText}
        >
          Register
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "rgb(255,75,89)",
    justifyContent: "center",
    alignItems: "center"
  },
  textStyles: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: '500'
  },
  touchableStyles: {
    marginTop: 15,
    backgroundColor: "rgb(52,83,139)",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5
  },
  inputStyles: {
    height: 45,  
    backgroundColor: 'white', 
    borderRadius: 10, 
    paddingLeft: 10
  },
  loginText: {
    color: "white", 
    fontSize: 22
  },
  registerText: {
    fontSize: 16, 
    fontWeight: "400", 
    marginTop: 10,
    color: 'white',
    textDecorationLine: "underline"
  }
});

const mapDispatchToProps = {
  login,
  register
};

const Login = connect(null, mapDispatchToProps)(LoginScreen);

export default Login;
