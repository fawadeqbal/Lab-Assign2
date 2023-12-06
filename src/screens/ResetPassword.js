import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert ,ImageBackground} from 'react-native';
import { auth } from '../config/firebase';
import tw from 'twrnc';
import { sendPasswordResetEmail } from 'firebase/auth';
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    
      sendPasswordResetEmail(auth,email)
      .then(() => {
        alert('Password Reset Email Sent\nCheck your email for instructions to reset your password.');
        console.log("Success")
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };
  const handleSignInPassword=()=>{
    navigation.replace("Signin")
  }

  return (
    <ImageBackground
    source={require('../../assets/background.png')} // Replace with the actual path to your background image
    style={tw`flex-1 justify-center items-center`}
  >
     <Text style={tw`text-3xl font-bold text-white mb-8`}>Chat App</Text>
      <Text style={tw`text-xl font-bold text-white mb-8`}>Reset Passwrd</Text>
   <View style={tw`bg-white p-4 rounded w-80`}>
      <TextInput
        style={tw`border-b-2 border-gray-700 p-2 mb-4 text-black`}
        placeholder="Enter your email"
        placeholderTextColor="#1E2019"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={handleResetPassword}>
        <Text style={tw`text-white`}>Reset Password</Text>
      </TouchableOpacity>
      
     
      </View>
      <TouchableOpacity style={tw`mt-2`} onPress={handleSignInPassword}>
        <Text style={tw`text-white text-center`}>Sign In</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ForgotPassword;
