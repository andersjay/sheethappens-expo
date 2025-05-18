import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PoemProps {
    text: string;
    author: string;
}
export default function Poem() {
    const [poem, setPoem] = useState<PoemProps>();
    const [poems, setPoems] = useState<PoemProps[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllPoems = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://poetrydb.org/random');
            const data = await response.json();
            setPoems(data);
        } catch (error) {
            console.error('Error fetching poems:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const openPoemsModal = async () => {
        await fetchAllPoems();
        setIsModalVisible(true);
    }

    useEffect(() => { 
        const lastPoem = async () => {
            try {
                const response = await fetch('https://poetrydb.org/random');
                const data = await response.json();
                setPoem(data[0]);
            } catch (error) {
                console.error('Error fetching poem:', error);
            }
        };

        lastPoem();
    }, []);

    return (
        <View style={styles.poemContainer}>
            {isLoading && <AppLoading />}
            <View style={styles.centralize}>
                <Text style={styles.smallText}>
                    {poem && poem.text ? "Último poema recebido" : "Você ainda não tem poemas!"}
                </Text>
            </View>
            {poem && poem.text && (
                <>
                    <Text style={styles.poemText}>
                        {poem.text}
                    </Text>
                    <Text style={styles.poemText}>- {poem.author}</Text>

                    <View style={styles.centralize}>
                        <TouchableOpacity style={styles.poemButton} onPress={openPoemsModal}>Ver meus Poemas</TouchableOpacity>
                    </View>
                </>
            )}

            {isModalVisible && (
                <View style={styles.poemContainer}>
                    <Text style={styles.poemText}>Meus Poemas</Text>
                    {poems.map((poem, index) => (
                        <Text key={index} style={styles.poemText}>{poem.text} - {poem.author}</Text>
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    poemContainer: {
        backgroundColor: '#D0C4A3',
        marginHorizontal: 40,
        paddingHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 15
    },
    centralize: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    smallText: {
        fontSize: 12,
        color: '#443627',
        marginBottom: 10
    },
    poemText: {
        fontSize: 16,
        color: '#443627',
        fontWeight: 'bold',
    },
    poemButton: {
        backgroundColor: '#443627',
        color: '#FCEFCB',
        padding: 10,
        borderRadius: 6,
        textAlign: 'center',
        marginTop: 10,
        width: '50%',
        fontSize: 12
    }
});