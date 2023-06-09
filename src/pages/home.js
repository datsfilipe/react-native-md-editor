import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { cacheDirectory, readAsStringAsync, copyAsync, getInfoAsync, makeDirectoryAsync } from 'expo-file-system'
import { EditorStore, fileAtom } from '../stores/editorStore';

// the reason for creating the cache file manually is https://github.com/expo/expo/issues/21792
const createCacheFile = async ({ name, uri }) => {
  if (!(await getInfoAsync(cacheDirectory + "uploads/")).exists) {
    await makeDirectoryAsync(cacheDirectory + "uploads/");
  }
  const cacheFilePath = cacheDirectory + "uploads/" + name;
  await copyAsync({ from: uri, to: cacheFilePath });
  return cacheFilePath;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#1a1a1a',
  }
});

export default function HomeScreen({ navigation }) {
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      multiple: false,
      type: 'text/markdown',
    });

    if (result.type === 'cancel') {
      return;
    }

    const cacheFile = await createCacheFile({
      name: result.name,
      uri: result.uri,
    });

    const content = await readAsStringAsync(cacheFile, { encoding: 'utf8' });

    EditorStore.set(fileAtom, {
      name: result.name,
      uri: cacheFile,
      originalUri: result.uri,
      content,
    });

    navigation.navigate('Editor');
  };

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
