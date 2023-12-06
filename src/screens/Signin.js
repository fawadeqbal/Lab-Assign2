import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { auth } from '../config/firebase';
import tw from 'twrnc';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { isEmailValid, isPasswordValid } from '../validator/commonvalidator';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkUserSignIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      navigation.navigate('TabNavigator')
      } else {
        // User is signed out
        console.log('User is signed out');
      }
    });
  };
  
  // Call the function to check user sign-in status
  checkUserSignIn();
  

  const signIn = () => {
    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isPasswordValid(password)) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in successfully, navigate to the main app screen
        navigation.replace('TabNavigator');
      })
      .catch((error) => {
        alert(`${error}`);
      });
  };

  const navigateToSignUp = () => {
    // Navigate to the sign-up screen
    navigation.navigate('Signup');
  };

  const navigateToForgotPassword = () => {
    // Navigate to the forgot password screen
    navigation.navigate('Reset Password');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')} // Replace with the actual path to your background image
      style={tw`flex-1 justify-center items-center`}
    >
      <Text style={tw`text-3xl font-bold text-white mb-8`}>Chat App</Text>
      <Text style={tw`text-3xl font-bold text-white mb-8`}>Login</Text>

      <View style={tw`bg-white p-4 rounded w-80`}>
        <TextInput
          style={tw`border-b-2 border-gray-700 p-2 mb-4 text-black`}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={tw`border-b-2 border-gray-700 p-2 mb-4 text-black`}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={signIn}>
          <Text style={tw`text-white text-center`}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={tw`mt-2`} onPress={navigateToSignUp}>
        <Text style={tw`text-white text-center`}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mt-2`} onPress={navigateToForgotPassword}>
        <Text style={tw`text-white text-center`}>Forgot Password?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SignIn;
