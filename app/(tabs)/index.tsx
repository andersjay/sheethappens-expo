import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [poops, setPoops] = useState(0);

  return (
    <View style={styles.stepContainer}>
      <View style={styles.poopCountContainer}>
        <View style={styles.poopCount}>
          <Text style={styles.poopCountText}>{poops} dias</Text>
          <Text style={styles.poopCountLabel}>Colaborando com a natureza</Text>
        </View>
        <View style={styles.poopImage}>
          <Text style={styles.poopImageText}>💩</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  poopCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCEFCB',
    padding: 16
  },
  poopCount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poopCountText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#443627'
  },
  poopCountLabel: {
    fontSize: 12,
    color: '#443627',
    marginLeft: 8,
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
});
