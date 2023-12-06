import React, { useState,useEffect } from "react";
import { View, Text, TextInput, Button, Picker,Alert } from "react-native";
import tw from "twrnc";
import RadioForm from "react-native-simple-radio-button";
import { db } from "../config/firebase";
import { addDoc,collection } from "firebase/firestore";
const EmployeeForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [address, setAddress] = useState("");
  const [countries, setCountries] = useState([]);
  const personRef = collection(db, 'persons');
  useEffect(() => {
    // Fetch countries data from an API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // Transform the data to the required format
        const transformedCountries = data.map((country) => ({
          label: country.name.common,
          value: country.cca2,
        }));
        // Sort countries alphabetically by label
        const sortedCountries = transformedCountries.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);
  const handleAddEmployee = () => {
   
      const data = {
        name,
        email,
        country,
        gender,
        skills,
        subjects,
        address
      };

      addDoc(personRef, data)
        .then(() => {
          alert('Info', 'Item added successfully');
          
        })
        .catch((e) => {
          alert(e);
        });
    
  };
  

  return (
    <View style={tw`flex-1 items-center justify-center p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-center`}>
        Person Form
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
      >{countries.map((c, index) => (
        <Picker.Item key={index} label={c.label} value={c.value} />
      ))}{/* Add more countries as needed */}
      </Picker>
      <View>
          <View style={tw`flex-1 ml-[-233px] flex-row`}>
          <Text>Gender:</Text>
          <RadioForm
        style={tw`mb-2`}
        formHorizontal={false}
  labelHorizontal={true}
  buttonColor={'#2196f3'}
        radio_props={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
        initial={0}
        onPress={(value) => setGender(value)}
      />
          </View>
      </View>
      
      <View style={tw`mb-2 w-full`}>
        <Text>Subjects:</Text>
        <View style={tw`flex-row gap-2 mt-2`}>
          <Button
            title="Math"
            onPress={() => setSubjects([...subjects, "Math"])}
          />
          <Button
            title="Phy"
            onPress={() => setSubjects([...subjects, "Phy"])}
          />
          <Button
            title="Chem"
            onPress={() => setSubjects([...subjects, "Chem"])}
          />
          <Button
            title="Eng"
            onPress={() => setSubjects([...subjects, "Eng"])}
          />
          {/* Add more buttons for other subjects as needed */}
        </View>
      </View>
      <TextInput
  style={tw`border p-2 mb-2 w-full`}
  placeholder="Skills (comma-separated)"
  value={skills.join(', ')} // Join array elements into a string for display
  onChangeText={(text) => {
    // Split the comma-separated values into an array
    const skillsArray = text.split(',').map(skill => skill.trim());
    setSkills(skillsArray);
  }}
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
