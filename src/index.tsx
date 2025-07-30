import { NativeEventEmitter, Platform } from 'react-native';
import HoneywellBarcodeReader from './NativeHoneywell';

const barcodeReaderEmitter = new NativeEventEmitter(HoneywellBarcodeReader);

// Get constants from the native module
const constants = (HoneywellBarcodeReader.getConstants?.() || {}) as any;

const HoneywellBarcodeReaderModule = {
  ...HoneywellBarcodeReader,

  startReader: async () => {
    return await HoneywellBarcodeReader.startReader();
  },

  stopReader: async () => {
    return await HoneywellBarcodeReader.stopReader();
  },

  setReaderProperty: (propName: string, value: string | number | boolean) => {
    if (typeof value === 'string') {
      HoneywellBarcodeReader.setReaderPropertyString(propName, value);
    } else if (typeof value === 'number') {
      HoneywellBarcodeReader.setReaderPropertyNumber(propName, value);
    } else if (typeof value === 'boolean') {
      HoneywellBarcodeReader.setReaderPropertyBoolean(propName, value);
    }
  },

  onBarcodeReadSuccess: (handler: (event: any) => void) => {
    barcodeReaderEmitter.addListener(
      constants.BARCODE_READ_SUCCESS || 'barcodeReadSuccess',
      handler
    );
  },

  onBarcodeReadFail: (handler: (event: any) => void) => {
    barcodeReaderEmitter.addListener(
      constants.BARCODE_READ_FAIL || 'barcodeReadFail',
      handler
    );
  },

  isCompatible: () => {
    return Platform.OS === 'android' && HoneywellBarcodeReader.isCompatible();
  },

  getBrand: () => {
    return constants.BRAND;
  },

  getConstants: () => constants,
};

export default HoneywellBarcodeReaderModule;
