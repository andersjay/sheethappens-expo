import api from '@/app/api';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

type PoopAlertTimesProps = {
	poopPlace: string;
	poopPlaceId: number;
};

export default function PoopAlertTimes({ poopPlace, poopPlaceId }: PoopAlertTimesProps) {

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await api.get(`/api/get-poop-local/${poopPlaceId}`);
                console.log(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchOptions();
    }, []);

	return (
        <>
            <Text>{poopPlace}</Text>
            <Text>{poopPlaceId}</Text>
        </>
    )
}

const style = StyleSheet.create({

});