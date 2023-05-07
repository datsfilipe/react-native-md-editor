import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useCallback, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#1a1a1a',
  }
});

export default function HomeScreen() {
  const [file, setFile] = useState(null);

  const pickFile = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: 'text/markdown',
    });

    if (result.type === 'success') {
      console.log(result);
      const content = await FileSystem.readAsStringAsync(result.uri, { encoding: 'utf8' });
      setFile(content);
    }
  }, []);

  console.log(file);

  return (
    <SafeAreaView style={styles.container} >
      <TouchableOpacity
        style={{ backgroundColor: '#fafafa', padding: 20, borderRadius: 5 }}
        onPress={pickFile}
      >
        <Text style={{ color: '#1a1a1a' }}>Hello, world!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
