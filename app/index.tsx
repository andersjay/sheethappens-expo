import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useFonts, Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import AppLoading from 'expo-app-loading';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Shrikhand_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/api/login', {
        email: data.email,
        password: data.password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      alert('Login realizado com sucesso!');
      router.replace('/(tabs)/homepage');
    } catch (error: any) {
      alert('Erro ao fazer login: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={[styles.titleContainer, { alignItems: 'center' }]}> 
          <Text style={[styles.title, { fontFamily: 'Shrikhand_400Regular' }]}>Sh*t</Text>
          <Text style={[styles.title, { fontFamily: 'Shrikhand_400Regular', lineHeight: 64 }]}>Happens</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <Controller
            control={control}
            rules={{ required: 'O email é obrigatório' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
            defaultValue=""
          />
          {typeof errors.email?.message === 'string' && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <Controller
            control={control}
            rules={{ required: 'A senha é obrigatória' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
            defaultValue=""
          />
          {typeof errors.password?.message === 'string' && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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