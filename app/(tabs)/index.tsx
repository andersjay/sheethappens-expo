import React, { useEffect, useState, useContext } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Poem from '../../components/Poem';
import Select from '../../components/Select';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { AuthContext } from '../AuthContext';

export default function HomeScreen() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [poops, setPoops] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sentence, setSentence] = useState('');
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchOptions = async () => {
        try {
            const response = await api.get('/api/places');
            const data = response.data.map((item: any) => ({ label: item.name, value: item.id }));
            setOptions(data);
        } catch (e) {
            console.error(e);
        } finally {
          setIsLoading(false);
        }
    };

    fetchOptions();
}, []);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/api/increment-poop', {
        place_id: selectedOption,
      });
      if (response.status === 200) {
        setPoops((prev) => prev + 1);
        // Buscar frase aleatória e mostrar como alert
        const sentenceRes = await api.get('/api/random-sentence');
        console.log(sentenceRes.data);
        if (sentenceRes.data && sentenceRes.data.sentence) {
          alert(sentenceRes.data.sentence);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('token_expires_at');
    setIsAuthenticated(false);
    router.replace('/');
  };

  return (
    <View style={styles.stepContainer}>
      <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 16, marginRight: 16 }}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <>
        <View style={styles.poopCountContainer}>
          <View style={styles.firstPoopCount}>
            <View style={styles.poopCount}>
              <Text style={styles.poopCountText}>{poops}x</Text>
              <Text style={styles.poopCountLabel}>Colaborando com a natureza</Text>
            </View>
            <View style={styles.poopImage}>
              <Image
                source={require('@/assets/images/cocozao.png')}
                style={styles.poopImageText}
                resizeMode="stretch" />
            </View>
          </View>

          <Poem />
        </View>
      </>

      <View style={styles.checkPoopContainer}>
        <Text style={styles.checkPoopText}>Local</Text>
        <Select isLoading={isLoading} options={options} setOptions={setOptions} selectedValue={selectedOption} setSelectedValue={setSelectedOption}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit} >
            <Text style={styles.buttonText}>PUXAR A DESCARGA</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, alignItems: 'center', maxWidth: '80%' }}>
            <Text style={{ fontSize: 18, marginBottom: 16, textAlign: 'center' }}>{sentence}</Text>
            <Poem />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#443627', padding: 12, borderRadius: 8, marginTop: 16 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    paddingBottom: 8,
    height: '100%'
  },
  poopCountContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FCEFCB',
    flex: 1,
  },
  poopCount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  firstPoopCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  poopCountText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#443627'
  },
  poopCountLabel: {
    fontSize: 12,
    color: '#443627'
  },
  poopImage: {
    borderRadius: 8,
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  poopImageText: {
    width: 100, 
    height: 100, 
    borderRadius: 10
  },
  checkPoopContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#896C4E',
    flex: 1,
  },
  checkPoopText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: '70%',
  },
  button: {
    backgroundColor: '#443627',
    padding: 20,
    marginVertical: 20,
    borderRadius: 6,
    textAlign: 'center',
    width: '100%',
    color: '#fff'
  },
  logoutButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#443627',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
