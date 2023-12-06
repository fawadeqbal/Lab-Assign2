import React, { useState } from "react";
import { View,TextInput,TouchableOpacity,Text,ImageBackground} from "react-native";
import { auth } from "../config/firebase";
import { isEmailValid, isPasswordValid } from "../validator/commonvalidator";
import tw from "twrnc";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace("Signin");
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")} // Replace with the actual path to your background image
      style={tw`flex-1 justify-center items-center`}
    >
       <Text style={tw`text-3xl font-bold text-white mb-8`}>Chat App</Text>
      <Text style={tw`text-xl font-bold text-white mb-8`}>Sign Up</Text>
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

        <TouchableOpacity style={tw`bg-green-500 p-2 rounded`} onPress={signUp}>
          <Text style={tw`text-white text-center`}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={tw`mt-2`} onPress={() => navigation.goBack()}>
        <Text style={tw`text-white text-center`}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SignUp;
