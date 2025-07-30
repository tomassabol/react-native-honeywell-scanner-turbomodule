import { useState } from 'react';
import { ScrollView, StyleSheet, Text, Alert, Button } from 'react-native';
import Honeywell from 'react-native-honeywell';

export default function App() {
  const [scanResult, setScanResult] = useState<string | undefined>();
  const [isReaderStarted, setIsReaderStarted] = useState<boolean>(false);

  const startReader = async () => {
    try {
      console.log('Starting Honeywell barcode reader...');
      console.log('Honeywell module:', Honeywell);
      const success = await Honeywell.startReader();
      setIsReaderStarted(success);
      if (success) {
        Alert.alert('Success', 'Barcode reader started successfully!');
      } else {
        Alert.alert('Error', 'Failed to start barcode reader');
      }
    } catch (error) {
      console.error('Error starting reader:', error);
      Alert.alert('Error', 'Error starting reader: ' + error);
    }
  };

  Honeywell.onBarcodeReadSuccess((event) => {
    console.log('Barcode read success:', event);
    setScanResult(event.data);
  });

  const stopReader = async () => {
    try {
      await Honeywell.stopReader();
      setIsReaderStarted(false);
      Alert.alert('Success', 'Barcode reader stopped');
    } catch (error) {
      console.error('Error stopping reader:', error);
      Alert.alert('Error', 'Error stopping reader: ' + error);
    }
  };

  if (!Honeywell) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.errorText}>
          Honeywell Barcode Reader is not available.
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Honeywell TurboModule Test</Text>

      <Text style={styles.text}>Module Status: ✅ Loaded Successfully</Text>

      <Text style={styles.text}>
        Device Compatible: {Honeywell.isCompatible() ? '✅ Yes' : '❌ No'}
      </Text>

      <Text style={styles.text}>
        Reader Status: {isReaderStarted ? '🟢 Started' : '🔴 Stopped'}
      </Text>

      <Text style={styles.text}>
        Last Scan Result: {scanResult || 'No scans yet'}
      </Text>

      {Honeywell.isCompatible() && (
        <>
          <Button
            title={isReaderStarted ? 'Stop Reader' : 'Start Reader'}
            onPress={isReaderStarted ? stopReader : startReader}
          />
        </>
      )}

      {scanResult && (
        <Text style={styles.resultText}>Last Scan: {scanResult}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
