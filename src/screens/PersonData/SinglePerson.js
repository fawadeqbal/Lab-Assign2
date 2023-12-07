import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { db } from "../../config/firebase";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";

const PersonDetails = () => {
  const navigation = useNavigation();
  const personRef = collection(db, "persons");
  const route = useRoute();
  const { selectedPerson } = route.params;

  const [editing, setEditing] = useState(false); // State to track editing mode
  const [name, setName] = useState(selectedPerson.name);
  const [email, setEmail] = useState(selectedPerson.email);
  const [address, setAddress] = useState(selectedPerson.address);

  const handleEdit = () => {
    if (editing) {
      // If already in editing mode, update the database
      updateDoc(doc(personRef, selectedPerson.id), {
        name,
        email,
        address,
      })
        .then(() => {
          console.log("Details updated successfully");
          setEditing(false); // Exit editing mode after updating
        })
        .catch((error) => {
          console.error("Error updating details: ", error);
          alert("Error updating details. Please try again.");
        });
    } else {
      // Enter editing mode
      setEditing(true);
    }
  };

  const handleDelete = () => {
    deleteDoc(doc(personRef, selectedPerson.id))
      .then(() => {
        console.log("Person deleted successfully");
        navigation.navigate("PersonData");
      })
      .catch((error) => {
        console.error("Error deleting person: ", error);
        alert("Error deleting person. Please try again.");
      });
  };

  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Person Details</Text>
      {editing ? ( // If in editing mode, display input fields
        <View>
          <View style={tw`mb-2`}>
            <Text style={tw`font-bold`}>Name:</Text>
            <TextInput
              style={tw`border border-gray-500 p-2`}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`font-bold`}>Email:</Text>
            <TextInput
              style={tw`border border-gray-500 p-2`}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={tw`mb-2`}>
            <Text style={tw`font-bold`}>Address:</Text>
            <TextInput
              style={tw`border border-gray-500 p-2`}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>
      ) : (
        // If not in editing mode, display person details
        <View>
          <View style={tw`mb-2`}>
            <View>
              {Object.entries(selectedPerson).map(([key, value]) => (
                <View key={key} style={tw`mb-2`}>
                  <Text style={tw`font-bold`}>{key}:</Text>
                  <Text>{Array.isArray(value) ? value.join(", ") : value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity
          style={tw`bg-blue-500 p-2 rounded-md items-center justify-center flex-1 mr-2`}
          onPress={handleEdit}
        >
          <Text style={tw`text-white`}>{editing ? "Update" : "Edit"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-red-500 p-2 rounded-md items-center justify-center flex-1 ml-2`}
          onPress={handleDelete}
        >
          <Text style={tw`text-white`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonDetails;
