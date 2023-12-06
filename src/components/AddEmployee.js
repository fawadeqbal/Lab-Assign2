// AddEmployeeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { addDoc, updateDoc, collection, doc } from 'firebase/firestore';
import db from './firebase';

const AddEmployeeScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [education, setEducation] = useState('');
  const [image, setImage] = useState('');

  const { isEditMode, employee } = route.params || {};

  useEffect(() => {
    if (isEditMode && employee) {
      setName(employee.name);
      setFatherName(employee.fatherName);
      setDob(employee.dob);
      setEducation(employee.education);
      setImage(employee.image);
    }
  }, [isEditMode, employee]);

  const handleSaveEmployee = async () => {
    try {
      const employeeData = { name, fatherName, dob, education, image };

      if (isEditMode && employee) {
        await updateDoc(doc(db, 'employees', employee.id), employeeData);
        alert('Employee updated successfully!');
      } else {
        await addDoc(collection(db, 'employees'), employeeData);
        alert('Employee added successfully!');
      }

      navigation.navigate('Employee List');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <View>
      <Text>{isEditMode ? 'Edit' : 'Add'} Employee</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Father Name" value={fatherName} onChangeText={setFatherName} />
      <TextInput placeholder="Date of Birth" value={dob} onChangeText={setDob} />
      <TextInput placeholder="Education" value={education} onChangeText={setEducation} />
      <TextInput placeholder="Image URL" value={image} onChangeText={setImage} />
      <Button title={isEditMode ? 'Update Employee' : 'Add Employee'} onPress={handleSaveEmployee} />
    </View>
  );
};

export default AddEmployeeScreen;
