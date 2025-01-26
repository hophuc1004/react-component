import typography from './plugins/typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif']
      },
      borderRadius: {
        md: '8px',
        xxSmall: '4px',
        xSmall: '8px',
        smallNudge: '16px',
        small: '24px',
        mediumNudge: '32px',
        medium: '40px',
        large: '48px',
        xLarge: '56px',
        xxLarge: '64px',
        Circular: '1000px'
      },
      colors: {
        primary: {
          dark: '#359739',
          DEFAULT: '#4CAF50',
          surface: '#F7FEE7',
          50: '#EBF1FA',
          100: '#CFDDF2',
          200: '#A6C1E7',
          500: '#346EC1',
          600: '#275391',
          700: '#1D3E6D',
          800: '#162F52'
        },
        secondary: {
          50: '#E3F4F6',
          100: '#C6E8EC',
          300: '#3DABB8',
          400: '#71C6D0',
          500: '#54BAC6',
          600: '#34919D'
        },
        common: {
          DEFAULT: 'var(--text-color)'
        },
        table: '#1F2937',
        green: {
          50: '#F2FCF2',
          100: '#D5F6D5',
          200: '#ABEDAB',
          300: '#71E071',
          400: '#A1A1AA',
          500: '#52C41A',
          600: '#389E0D',
          700: '#1B861B',
          800: '#1B791B',
          900: '#125112'
        },
        gray: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B'
        },
        purple: {
          50: '#DFD5FE',
          100: '#EFDBFF',
          200: '#AE96FD',
          300: '#9373FC',
          400: '#9254DE',
          500: '#722ED1',
          600: '#531DAB',
          700: '#3E1EA7',
          800: '#2F177E',
          900: '#1F0F54'
        },
        cyan: {
          50: '#D5F5FE',
          100: '#B9EEFE',
          200: '#96E5FD',
          300: '#73DDFC',
          400: '#50D4FC',
          500: '#13C2C2',
          600: '#26AAD1',
          700: '#006D75',
          800: '#17667E',
          900: '#0F4454'
        },
        blue: {
          50: '#E6F7FF',
          100: '#BAE7FF',
          200: '#96B8FD',
          300: '#73A1FC',
          400: '#5089FC',
          500: '#1890FF',
          600: '#096DD9',
          700: '#0050B3',
          800: '#17397E',
          900: '#0F2654'
        },
        yellow: {
          50: '#FEF0D5',
          100: '#FEF0B9',
          200: '#FDE896',
          300: '#FCE173',
          400: '#FCD950',
          500: '#FAAD14',
          600: '#D1AF26',
          700: '#8C7A1E',
          800: '#6E6917',
          900: '#54460F'
        },
        orange: {
          50: '#FFF7E6',
          100: '#FFE7BA',
          200: '#FDBB96',
          300: '#FFC069',
          400: '#FC8E50',
          500: '#FA8C16',
          600: '#D46B08',
          700: '#A7501E',
          800: '#873800',
          900: '#54280F'
        },
        red: {
          50: '#FFF1F0',
          100: '#FBBFB9',
          200: '#F99F99',
          300: '#F87878',
          400: '#F65F56',
          500: '#F5222D',
          600: '#CF1322',
          700: '#A32A23',
          800: '#7A201A',
          900: '#511511'
        },
        pink: {
          50: '#FDD6DF',
          100: '#FBBBC9',
          200: '#F99AAE',
          300: '#F78993',
          400: '#F56678',
          500: '#F4354D',
          600: '#CB2B4E',
          700: '#A3233E',
          800: '#7A1A2F',
          900: '#511117'
        },
        brand: {
          secondary: '#3DABB8'
        }
      },
      spacing: {
        common: '24px',
        xxSmall: '4px',
        md: '8px',
        smallNudge: '16px',
        xLarge: '32px'
      },
      gap: {
        small: '8px',
        common: '16px',
        large: '24px',
        xLarge: '32px'
      },
      fontWeight: {
        normal: '400'
      },
      boxShadow: {
        depth02: '0px 16px 24px -8px #0000000A, 0px 0px 8px -2px #0000000D, 0px 24px 32px -8px #00000014'
      },
      backgroundImage: {
        'bg-header': "url('/assets/images/background-header.svg')"
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  plugins: [typography(), require('@tailwindcss/typography')({ className: 'typo' })]
}
