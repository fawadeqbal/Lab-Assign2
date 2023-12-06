import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const PersonData = () => {
  const personRef = collection(db, 'persons');
  const [persons, setPersons] = useState([]);
  const navigation=useNavigation()
  const handleSelect = (selectedPerson) => {
    navigation.navigate('PersonDetails', { selectedPerson });
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(personRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPersons(data);
    });

    // Unsubscribe when component is unmounted
    return () => unsubscribe();
  }, [personRef]);

 

  return (
    <View style={tw`p-4`}>
         <Text style={tw`text-2xl font-bold mb-4`}>All Persons List</Text>
      <View style={tw`flex flex-row mb-4 p-2 bg-gray-200`}>
        <Text style={tw`flex-1 font-bold`}>Name</Text>
        <Text style={tw`flex-1 font-bold`}>Email</Text>
        <Text style={tw`flex-1 font-bold`}>Country</Text>
        <Text style={tw`flex-1 font-bold`}>Select</Text>
      </View>
      <FlatList
        data={persons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`flex flex-row mb-2 p-2 border-b border-gray-300`}>
            <Text style={tw`flex-1`}>{item.name}</Text>
            <Text style={tw`flex-1`}>{item.email}</Text>
            <Text style={tw`flex-1`}>{item.country}</Text>
            <TouchableOpacity
              style={tw`flex-1 bg-blue-500 p-2 rounded-md items-center justify-center`}
              onPress={() => handleSelect(item)}
            >
              <Text style={tw`text-white`}>Select</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default PersonData;
