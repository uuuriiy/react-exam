import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
        grey: string;
        white: string;
        black: string;
        blue: string;
        darkGrey: string;
        red: string;
        
        [key: string]: string;
    };
    fontFamily: {
      primary: string;
      secondary: string;
    };
  }
}