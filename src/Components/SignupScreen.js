import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Dimensions } from "react-native";

import auth0 from '../auth0';
import { login, registerSuccess } from "../Actions/actionCreator";
import {validateInput} from '../utils'

const width = Dimensions.get('window').width/1.5

class SignupView extends Component {

  state = {
    username:'',
    password:''
  }
  
  signup = () => {
    if(validateInput(this.state.username) && validateInput(this.state.password)){
      this.props.registerSuccess()
    }else{
      alert('Please enter both username and password.')
    }
    
  }

  auth0_signup = () => {
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

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.textStyles}>Auth0 authentication / Signup</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.auth0_signup}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

mapDispatchToProps = {
  login,
  registerSuccess
};

const Signup = connect(null, mapDispatchToProps)(SignupView);
export default Signup;

const styles = StyleSheet.create({
  textStyles: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: '500'
  },
  root: {
    flex: 1,
    backgroundColor: "indigo",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "pink",
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 5
  },
  inputStyles: {
    height: 45,  
    backgroundColor: 'white', 
    borderRadius: 10, 
    paddingLeft: 10
  }
});
