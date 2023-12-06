import React from "react";
const TodoItem = ({ item, onDelete }) => (
    <View style={tw`flex-row justify-between items-center p-2 border-b border-gray-400`}>
      <Text style={tw`text-black`}>{item.heading}</Text>
      <Text style={tw`text-black`}>{item.createdAt}</Text>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={tw`text-red-500`}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  export default TodoItem