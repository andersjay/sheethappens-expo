import { StyleSheet, Text, View } from 'react-native';

type PoopAlertTimesProps = {
    poopPlace: string;
    poopQuantity: number;
};

export default function PoopAlertTimes({ poopPlace, poopQuantity }: PoopAlertTimesProps) {

    return (
    <View style={styles.stepContainer}>
      <Text style={styles.message}>
        Você cagou {poopQuantity} {poopQuantity === 1 ? 'vez' : 'vezes'} em {poopPlace}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    backgroundColor: '#443627',
    borderRadius: 10,
    padding: 12,
  },
  message: {
    fontSize: 16,
    color: '#fff',
    width: '100%',
    textAlign: 'justify',
  },
});