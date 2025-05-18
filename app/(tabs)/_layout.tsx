import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Trophy, User, Toilet } from 'lucide-react-native';
import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#FCEFCB',
                tabBarInactiveTintColor: '#E9A319',
                tabBarActiveBackgroundColor: '#E9A319',
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    backgroundColor: '#FCEFCB', // fundo da tab bar
                    borderTopWidth: 0,
                    height: 85,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => <Trophy color={color} size={30} style={styles.trophy} />,
                }}
            />

            <Tabs.Screen
                name="toilet"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => <Toilet color={color} size={28} />,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => <User color={color} size={28} />,
                }}
            />


        </Tabs>
    );
}

const styles = StyleSheet.create({
    trophy: {

    }

});

