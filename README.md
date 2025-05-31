# Alternate - Contact Management App

A modern React Native contact management application built with Expo, featuring caller ID functionality and country-specific phone number handling.

## Features

- **Contact Management**: Add, edit, and delete contacts with ease
- **Phone Number Validation**: Smart phone number input with country selection
- **Caller ID Module**: Custom native module for caller identification
- **Country Selector**: Beautiful bottom sheet country picker with search
- **Material Design**: Modern UI following Material Design 3 principles
- **Performance Optimized**: Efficient list rendering and state management

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Native Paper** for Material Design components
- **MMKV** for fast storage
- **Bottom Sheet** for smooth interactions
- **Custom Native Modules** for advanced functionality

## Screenshots

*Add screenshots of your app here*

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alternate.git
cd alternate
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

## Building APK

### Development Build

To build a development APK:

```bash
npx expo run:android
```

### Production Build with EAS

1. Install EAS CLI:
```bash
npm install -g @expo/eas-cli
```

2. Configure EAS:
```bash
npx eas build:configure
```

3. Build for Android:
```bash
npx eas build --platform android
```

## Project Structure

```
├── app/                    # Main app screens
├── components/            # Reusable components
├── constants/            # App constants
├── hooks/               # Custom hooks
├── lib/                 # Utility functions and types
├── modules/             # Custom native modules
│   └── caller-id/       # Caller ID native module
├── store/               # State management
└── assets/              # Images and other assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/alternate](https://github.com/yourusername/alternate)
