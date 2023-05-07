import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1a1a1a',
    padding: 20,
  }
});

export default function HomeScreen() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={{ color: '#fafafa', fontSize: 16 }}
        multiline={true}
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
      />
    </View>
  );
}
