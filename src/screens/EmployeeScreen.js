import React, { useState } from "react";
import { View, Text, TextInput, Button, Picker } from "react-native";
import tw from "twrnc";
import RadioForm from "react-native-simple-radio-button";

const EmployeeForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [skills, setSkills] = useState("");
  const [address, setAddress] = useState("");

  const handleAddEmployee = () => {
    // Handle form submission here
    // You can access the form values in the state variables
    // email, name, country, gender, subjects, skills, address
    console.log("Form submitted!");
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Country:", country);
    console.log("Gender:", gender);
    console.log("Subjects:", subjects);
    console.log("Skills:", skills);
    console.log("Address:", address);
  };

  return (
    <View style={tw`flex-1 items-center justify-center p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-center`}>
        Employee Form
      </Text>

      <TextInput
        style={tw`border p-2 mb-2 w-full`}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={tw`border p-2 mb-2 w-full`}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Picker
        style={tw`border p-2 mb-2 w-full`}
        selectedValue={country}
        onValueChange={(itemValue) => setCountry(itemValue)}
      >
        <Picker.Item label="Select Country" value="" />
        <Picker.Item label="USA" value="USA" />
        <Picker.Item label="Canada" value="Canada" />
        {/* Add more countries as needed */}
      </Picker>
      <RadioForm
        style={tw`mb-2 w-full`}
        radio_props={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
        initial={-1}
        onPress={(value) => setGender(value)}
      />
      <View style={tw`mb-2 w-full`}>
        <Text>Subjects:</Text>
        <View style={tw`flex-row`}>
          <Button
            title="Math"
            onPress={() => setSubjects([...subjects, "Math"])}
          />
          {/* Add more buttons for other subjects as needed */}
        </View>
      </View>
      <TextInput
        style={tw`border p-2 mb-2 w-full`}
        placeholder="Skills (comma-separated)"
        value={skills}
        onChangeText={(text) => setSkills(text)}
      />
      <TextInput
        style={tw`border p-2 mb-2 w-full`}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Button
        style={tw`mb-4`}
        title="Submit"
        onPress={handleAddEmployee}
      />
    </View>
  );
};

export default EmployeeForm;
