import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Toilet } from 'lucide-react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

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
                    tabBarIcon: ({ color }) => <Toilet color={color} size={28} />,
                }}
            />


        </Tabs>
    );
}

const styles = StyleSheet.create({
    trophy: {

    }

});

