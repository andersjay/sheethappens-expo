import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


export default function Select() {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                // Exemplo: const response = await fetch('https://api.exemplo.com/options');
                // const data = await response.json();
                const data = [
                    { label: 'Masculino', value: 'M' },
                    { label: 'Feminino', value: 'F' },
                    { label: 'Outro', value: 'O' },
                ];
                setOptions(data as any);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const selectedOption = options.find((o: any) => o.value === selectedValue);

    const handleSelect = (value: any) => {
        setSelectedValue(value);
        setVisible(false);
    };

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" />;
    }

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
                <Text style={selectedOption ? styles.text : styles.placeholder}>
                    {selectedOption ? selectedOption['label'] : 'Selecione...'}
                </Text>
                <Ionicons name={visible ? 'chevron-up' : 'chevron-down'} size={20} style={styles.inputIcon} />
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.modal}>
                        <FlatList
                            data={options}
                            keyExtractor={item => String(item['value'])}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item['value'])}
                                >
                                    <Text style={styles.optionText}>{item['label']}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    loader: { 
        flex: 1, 
        justifyContent: 'center'
    },
    inputContainer: {
        width: '70%',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#FCEFCB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        width: '100%',
    },
    inputIcon: {
        color: '#896C4E'
    },
    placeholder: { 
        color: '#896C4E',
        fontWeight: 'bold'
    },
    text: { 
        color: '#896C4E',
        fontWeight: 'bold'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 6,
        maxHeight: '50%',
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: { 
        fontSize: 16 
    },
});
