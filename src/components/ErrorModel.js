import React from 'react';
import { Modal, Portal, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import tw from 'twrnc';

const ErrorModal = ({ visible, errorMessage, onClose }) => {
  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={tw`bg-white p-4 rounded-md`}>
          <Text style={tw`text-red-500 mb-2 text-center`}>Error</Text>
          <Text style={tw`text-gray-700 text-center`}>{errorMessage}</Text>
          <Button style={tw`mt-4`} onPress={onClose}>
            Close
          </Button>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default ErrorModal;
