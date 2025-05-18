import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import api from './api';

export default function RegisterScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.post('/api/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      alert('Registro realizado com sucesso!');
      router.replace('/');
    } catch (error: any) {
      alert('Erro ao registrar: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome</Text>
          <Controller
            control={control}
            rules={{ required: 'O nome é obrigatório' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
              />
            )}
            name="name"
            defaultValue=""
          />
          {typeof errors.name?.message === 'string' && <Text style={styles.error}>{errors.name.message}</Text>}
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
          {typeof errors.email?.message === 'string' && <Text style={styles.error}>{errors.email.message}</Text>}
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
          {typeof errors.password?.message === 'string' && <Text style={styles.error}>{errors.password.message}</Text>}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E9A319',
    marginBottom: 32,
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
  buttonText: {
    color: '#443627',
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
}); 