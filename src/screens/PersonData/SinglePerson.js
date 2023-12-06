// PersonDetails.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { db } from "../../config/firebase";
import { collection,deleteDoc,doc } from "firebase/firestore";
const PersonDetails = () => {
  const navigation = useNavigation();
  const personRef=collection(db,'persons')
  const route = useRoute();
  const { selectedPerson } = route.params;

  const handleEdit = () => {
    console.log("Edit button pressed");
  };

  const handleDelete = (id) => {
    deleteDoc(doc(personRef, id)).then(()=>{
        navigation.navigate("PersonData")
    })
    .catch((e) => {todoRef
      alert(e);
    });
  };

  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Person Details</Text>
      <View>
        {Object.entries(selectedPerson).map(([key, value]) => (
          <View key={key} style={tw`mb-2`}>
            <Text style={tw`font-bold`}>{key}:</Text>
            <Text>{Array.isArray(value) ? value.join(", ") : value}</Text>
          </View>
        ))}
      </View>

      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity
          style={tw`bg-blue-500 p-2 rounded-md items-center justify-center flex-1 mr-2`}
          onPress={handleEdit}
        >
          <Text style={tw`text-white`}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-red-500 p-2 rounded-md items-center justify-center flex-1 ml-2`}
          onPress={()=>handleDelete(selectedPerson.id)}
        >
          <Text style={tw`text-white`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonDetails;
