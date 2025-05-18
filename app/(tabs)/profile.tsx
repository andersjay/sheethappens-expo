import PoopAlertTimes from '@/components/PoopAlertTimes';
import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import api from '../api';

interface PoopPlace {
  name: string;
  poop_counts_count: number;
}

export default function Profile() {
  const [poopPlaces, setPoops] = useState([] as PoopPlace[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
        try {
            const response = await api.get('/api/locals-with-poop-count');
            console.log(response.data);
            const data = response.data.map((item: PoopPlace) => ({name: item.name, poop_counts_count: item.poop_counts_count }));
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
          resizeMode="cover"
        />
      </View>
      <View style={styles.shitCounterTimesContainer}>
        {poopPlaces.map((poop, index) => (
          <View style={styles.poopCountContainer} key={index}>
            <PoopAlertTimes
              poopPlace={poop.name}
              poopQuantity={poop.poop_counts_count}/>
          </View>
        ))}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    backgroundColor: '#FCEFCB',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  headerImage: {
    height: 150,
    width: '40%',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shitCounterTimesContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    gap: 8,
  },
  poopCountContainer: {
    flexBasis: '30%',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
});
