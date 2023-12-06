import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, Alert,ImageBackground } from 'react-native';
import { auth, db } from '../config/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import tw from 'twrnc';

const Todos = ({ navigation }) => {
  const todoRef = collection(db, 'todos');
  const [todos, setTodos] = useState([]);
  const [addData, setAddData] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setTodos(data);
  });

    // Unsubscribe when component is unmounted
    return () => unsubscribe();
  }, [todoRef]);

  useEffect(() => {
    // Get user information on component mount
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Signin');
      })
      .catch((error) => {
        console.error('Signout Error', error);
      });
  };

  const addField = () => {
    if (addData && addData.length > 0) {
      const timestamp = serverTimestamp();
      const data = {
        title: addData,
        createdAt: timestamp,
      };

      addDoc(todoRef, data)
        .then(() => {
          Alert.alert('Info', 'Item added successfully');
          setAddData('');
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  const deleteField = (id) => {
    deleteDoc(doc(todoRef, id))
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <ImageBackground
    source={require('../../assets/background.png')} // Replace with the actual path to your background image
    style={tw`flex-1 justify-center items-center`}
  >
    <View style={tw`p-6 bg-white rounded  w-[80%] h-[80%]`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-xl font-bold`}>Todos</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-black mr-2`}>{userEmail}</Text>
          <TouchableOpacity onPress={handleSignout}>
            <Text style={tw`text-red-500`}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Input Section */}
      <TextInput
        style={tw`border-b-2 border-gray-700 p-2 mb-4 text-black`}
        placeholder="Type something..."
        placeholderTextColor="#1E2019"
        onChangeText={(text) => setAddData(text)}
        value={addData}
      />
      <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={addField}>
        <Text style={tw`text-white`}>Add Todo</Text>
      </TouchableOpacity>

      {/* Table Section */}
      <FlatList
        style={tw`mt-4`}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem item={item} onDelete={deleteField} />}
      />
      </View>
    </ImageBackground>
  );
};


const TodoItem = ({ item, onDelete }) => (
  <View style={tw`flex-row justify-between items-center p-2 border-b border-gray-400`}>
    <Text style={tw`text-black flex-1`}>{item.title}</Text>
    <Text style={tw`text-black flex-1`}>{item.createdAt && item.createdAt.toDate().toLocaleString()}</Text>
    <TouchableOpacity onPress={() => onDelete(item.id)}>
      <Text style={tw`text-red-500`}>Delete</Text>
    </TouchableOpacity>
  </View>
  
);

export default Todos;
