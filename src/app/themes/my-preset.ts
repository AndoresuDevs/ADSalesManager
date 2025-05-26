// src/app/theme/mypreset.ts
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}'
    },
    surface: {
      0: '{slate.0}',
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{blue.600}'
        },
        surface: {
          background: '{slate.50}',
          card: '{slate.100}'
        }
      },
      dark: {
        primary: {
          color: '{blue.400}'
        },
        surface: {
          background: '{slate.900}',
          card: '{slate.800}'
        }
      }
    }
  }
});

export default MyPreset;
