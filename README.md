# React Native Honeywell Barcode Reader

A React Native TurboModule for Honeywell devices with integrated barcode scanners, such as the Honeywell EDA50K, EDA51, and other compatible devices.

## Features

- **New Architecture Only**: Built exclusively for React Native's new architecture (Fabric/TurboModule)
- **TypeScript Support**: Full TypeScript definitions and modern API
- **Event-driven**: Listen to barcode scan success and failure events
- **Property Configuration**: Configure scanner properties dynamically
- **Optimized Performance**: Fixed duplicate scan events and improved reliability
- **React Native 0.72.0+**: Optimized for modern React Native versions

> **Important**: This package requires React Native's New Architecture to be enabled in your project.

This version is a modernized fork from [react-native-honeywell-barcode-reader](https://github.com/duytq94/react-native-honeywell-barcode-reader) with significant improvements and TurboModule support.

## Installation

```bash
npm install react-native-honeywell
```

or

```bash
yarn add react-native-honeywell
```

## Requirements

### React Native New Architecture

This package requires React Native's New Architecture to be enabled in your project:

1. **Android Configuration** - In `android/gradle.properties`, ensure these properties are set:

   ```properties
   newArchEnabled=true
   ```

2. **Babel Configuration** - In your app's `babel.config.js`, ensure you have:
   ```js
   module.exports = {
     presets: ['module:@react-native/babel-preset'],
   };
   ```

### React Native Version

- React Native 0.72.0 or higher
- Android API level 21 or higher
- Honeywell devices with integrated barcode scanner

## Setup

For React Native 0.72+, the package will automatically link with autolinking. No manual linking is required.

### Android Permissions

The package automatically includes the necessary permissions in its `AndroidManifest.xml`. No additional permissions are required in your app.

## Usage

### Import the Module

```js
import HoneywellBarcodeReader from 'react-native-honeywell';
```

### Check Device Compatibility

First, check if the current device is a compatible Honeywell scanner:

```js
const isCompatible = HoneywellBarcodeReader.isCompatible();
console.log(isCompatible ? 'Device is compatible' : 'Device is not compatible');
```

### Start the Barcode Reader

The barcode reader needs to be "claimed" by your application. While claimed, no other application can use the scanner:

```js
try {
  const claimed = await HoneywellBarcodeReader.startReader();
  console.log(claimed ? 'Barcode reader is claimed' : 'Barcode reader is busy');
} catch (error) {
  console.error('Failed to start reader:', error);
}
```

### Listen for Barcode Scan Events

Set up event listeners to receive barcode scan results:

```js
// Listen for successful scans
HoneywellBarcodeReader.onBarcodeReadSuccess((event) => {
  console.log('Barcode scanned:', event);
  // event contains the scanned barcode data
});

// Listen for scan failures
HoneywellBarcodeReader.onBarcodeReadFail((error) => {
  console.log('Barcode scan failed:', error);
});
```

### Configure Scanner Properties

You can configure various scanner properties:

```js
// Set string properties
HoneywellBarcodeReader.setReaderProperty('DEC_CODABAR_ENABLED', 'true');

// Set number properties
HoneywellBarcodeReader.setReaderProperty('DEC_CODABAR_MIN_LENGTH', 4);

// Set boolean properties
HoneywellBarcodeReader.setReaderProperty('DEC_QR_ENABLED', true);
```

### Stop the Barcode Reader

When you're done scanning, stop the reader to free up resources:

```js
try {
  await HoneywellBarcodeReader.stopReader();
  console.log('Barcode reader stopped successfully');
} catch (error) {
  console.error('Failed to stop reader:', error);
}
```

### Remove Event Listeners

To prevent memory leaks, remove event listeners when they're no longer needed:

## API Reference

### Methods

| Method                           | Description                                       | Returns            |
| -------------------------------- | ------------------------------------------------- | ------------------ |
| `isCompatible()`                 | Check if device is a compatible Honeywell scanner | `boolean`          |
| `startReader()`                  | Claim and start the barcode reader                | `Promise<boolean>` |
| `stopReader()`                   | Stop the barcode reader and release resources     | `Promise<void>`    |
| `setReaderProperty(name, value)` | Configure scanner properties                      | `void`             |
| `onBarcodeReadSuccess(callback)` | Listen for successful scans                       | `void`             |
| `onBarcodeReadFail(callback)`    | Listen for scan failures                          | `void`             |
| `getBrand()`                     | Get device brand information                      | `string`           |
| `getConstants()`                 | Get available constants from native module        | `object`           |

### Events

#### Barcode Read Success

```js
HoneywellBarcodeReader.onBarcodeReadSuccess((event) => {
  // event structure may vary based on barcode type
  console.log(event);
});
```

#### Barcode Read Failure

```js
HoneywellBarcodeReader.onBarcodeReadFail((error) => {
  console.log('Scan failed:', error);
});
```

## Example App

See the `example/` directory for a complete working example demonstrating all features of the package.

## Troubleshooting

### "Module not found" or Build Errors

1. Ensure New Architecture is enabled in `android/gradle.properties`:

   ```properties
   newArchEnabled=true
   ```

2. Clean and rebuild your project:
   ```bash
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```

### Scanner Not Working

1. Verify the device is a compatible Honeywell scanner
2. Check that no other app is currently using the scanner
3. Ensure proper permissions are granted

### TypeScript Errors

Make sure you have the latest TypeScript definitions. The package includes built-in TypeScript support.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Credits

This package is based on the original work by [duytq94](https://github.com/duytq94/react-native-honeywell-barcode-reader) and has been modernized for React Native's new architecture.
