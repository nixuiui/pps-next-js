import { createTheme } from '@paljs/theme';
import { DefaultTheme } from 'styled-components';

const shared = {
  sidebarHeaderGap: '2rem',
  fontFamilyPrimary: `-apple-system,BlinkMacSystemFont,
          "Segoe UI",Roboto,"Helvetica Neue",
          Arial,sans-serif,"Apple Color Emoji",
          "Segoe UI Emoji","Segoe UI Symbol"`,
};

export default function themeService(theme, dir) {
  switch (theme) {
    case 'dark':
    case 'cosmic':
    case 'corporate':
    default:
      return createTheme(theme, { dir, ...shared });
  }
}
