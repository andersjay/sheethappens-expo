import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack , useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect, useState, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from './AuthContext';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.multiGet(['token', 'token_expires_at']).then(([tokenArr, expiresArr]) => {
      const token = tokenArr[1];
      const expiresAt = expiresArr[1];
      if (token && expiresAt && Date.now() < Number(expiresAt)) {
        setIsAuthenticated(true);
        router.replace('/(tabs)/homepage');
      } else {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('token_expires_at');
        setIsAuthenticated(false);
        router.replace('/');
      }
    });
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="index" options={{ headerShown: false, title: '' }} />
              <Stack.Screen name="register" options={{ headerShown: false, title: '' }} />
            </>
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
