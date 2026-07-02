# Clutch

A mobile mechanic app built with Expo — think DoorDash + Facebook, but for getting a mechanic to your car. Customers post jobs and get matched with nearby mechanics; mechanics browse and accept job postings. Includes AI-assisted chat/video support, XP and job-completion levels, and a language-selection flow.

This is a teaching project: it's built feature by feature to demonstrate how to put together a modern, AI-powered Expo app.

## Tech stack

- Expo + Expo Router
- React Native + TypeScript
- NativeWind (Tailwind CSS for React Native)
- Zustand + AsyncStorage
- Clerk (authentication)
- Stream / GetStream (video, real-time chat, AI video agents)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction) — routes live in the **app** directory.

## Scripts

```bash
npm run lint        # expo lint
npm run typecheck   # tsc --noEmit
npm run ios         # expo start --ios
npm run android     # expo start --android
npm run web         # expo start --web
```

## Project conventions

See [AGENTS.md](./AGENTS.md) for the full architecture, styling, and contribution guidelines this project follows.
