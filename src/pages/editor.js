import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { EditorStore, fileAtom } from '../stores/editorStore';
import { setStringAsync } from 'expo-clipboard';
import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1a1a1a',
    padding: 20,
  }
});

const copyToClipboard = async (text) => {
  await setStringAsync(text);

  alert('Copied to clipboard!');
};

alert("The scroll is disabled until you click in the edit button.")

export default function HomeScreen() {
  const [edit, setEdit] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const value = EditorStore.get(fileAtom).content;
  const filename = EditorStore.get(fileAtom).name;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowButtons(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowButtons(true);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fafafa', fontSize: 22, marginBottom: 30, fontWeight: 700 }}>
        ~{filename}
      </Text>
      <TextInput
        style={{
          color: '#fafafa',
          fontSize: 16,
          flex: 1,
          overflow: 'scroll',
        }}
        multiline={true}
        defaultValue={value}
        onChangeText={(text) => {
          EditorStore.set(fileAtom, {
            ...EditorStore.get(fileAtom),
            content: text,
          });
        }}
        editable={edit}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#fafafa',
          padding: 10,
          width: 60,
          height: 60,
          borderTopEndRadius: 0,
          borderTopStartRadius: 0,
          borderBottomEndRadius: 25,
          borderBottomStartRadius: 25,
          position: 'absolute',
          bottom: 20,
          right: 20,
          alignItems: 'center',
          justifyContent: 'center',
          display: showButtons ? 'flex' : 'none',
        }}
        onPress={() => {
          setEdit(!edit);
        }}
      >
        <Text style={{ color: '#1a1a1a' }}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#fafafa',
          padding: 10,
          width: 60,
          height: 60,
          borderBottomEndRadius: 0,
          borderBottomStartRadius: 0,
          borderTopEndRadius: 25,
          borderTopStartRadius: 25,
          position: 'absolute',
          bottom: 60,
          right: 20,
          alignItems: 'center',
          justifyContent: 'center',
          display: showButtons ? 'flex' : 'none',
        }}
        onPress={() => {
          copyToClipboard(value);
        }}
      >
        <Text style={{ color: '#1a1a1a' }}>Copy</Text>
      </TouchableOpacity>
    </View>
  );
}
