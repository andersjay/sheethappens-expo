import { useState } from 'react';
import { StyleSheet,Text, View } from 'react-native';
import { useFonts, Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';


import AppLoading from 'expo-app-loading';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';
  let [fontsLoaded] = useFonts({
      Shrikhand_400Regular,
    });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemedView style={styles.container}>
      <View>
        <Text style={styles.title}>Sh*t Happens</Text>
      </View>

    </ThemedView>   
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  title: {
    fontFamily: 'Shrikhand_400Regular',
    fontSize: 30,
    color: '#E9A319',
    paddingBottom: 20,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FCEFCB',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E9A319',
  }
  
});

