import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFonts, Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import AppLoading from 'expo-app-loading';

export default function LoginScreen() {
  const [isInputFilled, setIsInputFilled] = useState(false);
  let [fontsLoaded] = useFonts({
    Shrikhand_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { alignItems: 'center' }]}> 
        <Text style={[styles.title, { fontFamily: 'Shrikhand_400Regular' }]}>Sh*t</Text>
        <Text style={[styles.title, { fontFamily: 'Shrikhand_400Regular', lineHeight: 64 }]}>Happens</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry />
      </View>
      <TouchableOpacity style={[styles.button, isInputFilled ? styles.buttonDisabled : {}]} disabled={isInputFilled} onPress={() => { }}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#443627',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#E9A319',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 0,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 10,
    marginBottom: 20,

  },
  inputLabel: {
    fontSize: 18,

    color: '#E9A319',
  },
  input: {
    backgroundColor: '#644F39',
    padding: 15,
    borderRadius: 4,
    color: '#FFFF',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#E9A319',
    padding: 15,
    borderRadius: 4,
    color: '#FFFF',
    fontSize: 18,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  buttonDisabled: {
    backgroundColor: '#644F39',
  },
  buttonText: { 
    color: '#443627',
    fontSize: 20 ,
    fontWeight: 'bold',
  },
}); 