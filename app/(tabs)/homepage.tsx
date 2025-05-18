import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Poem from '../../components/Poem';
import Select from '../../components/Select';

export default function HomeScreen() {
  const [poops, setPoops] = useState(0);

  return (
    <View style={styles.stepContainer}>
      <>
        <View style={styles.poopCountContainer}>
          <View style={styles.firstPoopCount}>
            <View style={styles.poopCount}>
              <Text style={styles.poopCountText}>{poops}x</Text>
              <Text style={styles.poopCountLabel}>Colaborando com a natureza</Text>
            </View>
            <View style={styles.poopImage}>
              <Text style={styles.poopImageText}>💩</Text>
            </View>
          </View>

          <Poem />
        </View>
      </>

      <View style={styles.checkPoopContainer}>
        <Text style={styles.checkPoopText}>Local</Text>
        <Select />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPoops(p => p + 1)} >
            PUXAR A DESCARGA
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 32,
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
  }
});
