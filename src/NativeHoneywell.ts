import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  startReader(): Promise<boolean>;
  stopReader(): Promise<void>;
  setReaderPropertyString(propName: string, value: string): void;
  setReaderPropertyNumber(propName: string, value: number): void;
  setReaderPropertyBoolean(propName: string, value: boolean): void;
  isCompatible(): boolean;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('HoneywellBarcodeReader');
