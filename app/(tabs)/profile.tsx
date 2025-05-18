import PoopAlertTimes from '@/components/PoopAlertTimes';
import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import api from '../api';

interface PoopPlace {
  name: string;
  id: number;
}

export default function Profile() {
  const [poopPlaces, setPoops] = useState([] as PoopPlace[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
        try {
            const response = await api.get('/api/places');
            const data = response.data.map((item: PoopPlace) => ({name: item.name, id: item.id }));
            setPoops(data);
        } catch (e) {
            console.error(e);
        } finally {
          setIsLoading(false);
        }
    };

    fetchOptions();
  }, []);

  return (
    <View style={styles.stepContainer}>
      <AppLoading />
      <View style={styles.headerImage}>
        <Image
          source={{ uri: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jack" }}
          style={styles.image}
          resizeMode="contain" />
      </View>
      <View style={styles.shitCounterTimesContainer}>
        {poopPlaces.map((poop, index) => (
          <View style={styles.poopCountContainer} key={index}>
            <PoopAlertTimes
              poopPlace={poop.name}
              poopPlaceId={poop.id}/>
          </View>
        ))}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    height: 150,
    width: '100%',
    backgroundColor: '#FCEFCB',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 200,
    height: 150
  },
  shitCounterTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FCEFCB',
    flex: 1,
  },
  poopCountContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FCEFCB',
    flex: 1,
  }
});
