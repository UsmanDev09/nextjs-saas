import { outlinedInputClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: null,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        containedPrimary: {
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '20px',
          backgroundColor: '#886FFF',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '13px 20px 15px',
          '&:active, &:focus, &:hover': {
            backgroundColor: '#6A51E1',
          },
          '&:disabled': {
            backgroundColor: '#886FFF1A',
            color: '#886FFF99',
          },
        },
        containedSecondary: {
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '20px',
          backgroundColor: '#FFFFFF',
          color: '#6C629B',
          borderRadius: '8px',
          padding: '12px 20px 14px',
          border: '1.5px solid #FFFFFF',
          '&:active, &:focus, &:hover': {
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #886FFF',
          },
          '&:disabled': {
            backgroundColor: '#E6E1EE',
            color: '#A09BA8',
            border: '1.5px solid #DCD7E4',
          },
        },
      },
      variants: [
        {
          props: {},
          style: {
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '19px',
            border: '1.5px solid #FFFFFF',
            '&:active, &:focus, &:hover': {
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #8674DB',
              boxShadow: ' 0px 0px 0px 2px #8674DB1A',
            },
            '&:disabled': {
              backgroundColor: '#FFFFFF',
              color: '#bdbdbd',
              border: '1.5px solid #FFFFFF',
            },
          },
        },
      ],
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width:900px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          background: '#886FFF',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#EAEEF3',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: '#6A51E1',
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '18px',
          display: 'inline-flex',
          alignItems: 'center',
          '&:hover': {
            textDecoration: 'underline',
          },
          '&.MuiTypography-body1 > svg': {
            marginTop: 2,
          },
          '& svg:last-child': {
            marginLeft: 2,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          [`&.${outlinedInputClasses.root}`]: {
            padding: 0,
            borderRadius: '8px',
            border: '1.5px solid #FFFFFF',
            backgroundColor: '#FFFFFF',
            '&:hover': {
              border: '1.5px solid #886FFF',
              boxShadow: '0px 0px 0px 2.5px #8674DB1A',
            },
            '&:active, &.Mui-focused': {
              border: '1.5px solid #BDAFFF',
              boxShadow: 'none',
            },

            fieldset: {
              border: 'none',
              top: 0,
              legend: {
                display: 'none',
              },
            },
          },
          '& input::placeholder': {
            color: '#D2CFD7',
            fontFamily: 'Poppins',
            opacity: 1,
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '20px',
          },
        },
        input: {
          [`&.${outlinedInputClasses.input}`]: {
            height: 'auto',
            padding: '13px 12px',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '20px',
            color: '#2C2535',
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 30px #FFFFFF inset',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          margin: 0,
          color: 'currentColor',
        },
        positionStart: {
          marginLeft: '12px',
        },
        positionEnd: {
          marginRight: '12px',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            color: '#343434',
            opacity: '0.4',
          },
          marginTop: '4px',
          marginLeft: '12px',
          fontFamily: 'Poppins',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '16px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          '&:hover, &:focus': {
            backgroundColor: '#EAEEF3',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: '20px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: '8px',
          border: '1.5px solid #BDAFFF',
          boxShadow: 'none',
          borderRadius: '8px',
        },
        list: {
          padding: '4px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: '38px',
          flexShrink: 0,
        },
        flexContainer: {
          borderBottom: '2px solid',
          borderColor: '#E5E8EC',
        },
        indicator: {
          backgroundColor: '#886FFF',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '8px 16px 6px',
          minWidth: '52px',
          minHeight: '38px',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#16141966',
          '&.Mui-selected': {
            color: '#343434',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          '&[href]': {
            textDecorationLine: 'none',
          },
        },
        outlined: {
          display: 'block',
          borderColor: '#E5E8EC',
          'a&, button&': {
            '&:hover': {
              boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 'auto',
          padding: '8px 9px 10px',
          color: '#2C2535',
          backgroundColor: '#FAF8FD',
          borderRadius: '8px',
          border: '1.5px solid #FFFFFF',
          boxShadow: '0px 24px 64px 0px #C8C3D066',
          '&:hover': {
            backgroundColor: '#FAF8FD',
            boxShadow: '0px 24px 64px 0px #C8C3D066',
          },
          '&:active, &.Mui-focused': {
            color: '#38229F',
            backgroundColor: '#F1EBF9',
            border: '1.5px solid rgba(138, 128, 185, 0.3)',
            boxShadow: '0px 24px 64px 0px #C8C3D066',
          },
        },
        label: {
          padding: 0,
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '20px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          borderColor: '#E5E8EC',
        },
        head: {
          color: '#20262D',
          fontWeight: 700,
        },
        body: {
          color: '#2F3A45',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          color: '#46505A',
          borderColor: '#E5E8EC',
          '&.Mui-selected': {
            borderColor: '#007FFF !important',
            color: '#007FFF',
            backgroundColor: '#F0F7FF',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          paddingTop: 7,
          paddingBottom: 7,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 32,
          height: 20,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              transform: 'translateX(11px)',
              color: '#fff',
            },
          },
        },
        switchBase: {
          height: 20,
          width: 20,
          padding: 0,
          color: '#fff',
          '&.Mui-checked + .MuiSwitch-track': {
            opacity: 1,
          },
        },
        track: {
          opacity: 1,
          borderRadius: 32,
          backgroundColor: '#BFC7CF',
        },
        thumb: {
          flexShrink: 0,
          width: '14px',
          height: '14px',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      '50': '#E6E1EE',
      '100': '#D2CDDA',
      '200': '#242229',
      '300': '#D2CFD7', //input placeholder
      '400': '#F1EBF9', //menu option hover
      '500': '#BDAFFF', //dashboard
      '600': '#0072E5',
      '700': '#886FFF',
      '800': '#38229F', // selected text
      '900': '#886FFF', // check mark icon / new main color
      main: '#8A80B9',
      light: '#66B2FF',
      dark: '#0059B2',
      contrastText: '#fff',
    },
    divider: '#E5E8EC',
    // primaryDark: {
    //   '50': '#E2EDF8',
    //   '100': '#6A51E1',
    //   '200': '#91B9E3',
    //   '300': '#5090D3',
    //   '400': '#265D97',
    //   '500': '#1E4976',
    //   '600': '#173A5E',
    //   '700': '#132F4C',
    //   '800': '#001E3C',
    //   '900': '#0A1929',
    //   main: '#5090D3',
    // },
    // purple: {
    //   '50': '#886fff1a',
    //   '100': '#6A51E1',
    // },
    common: {
      black: '#1D1D1D',
      white: '#FFFF',
      // rubies: '#FC3952',
      // energies: '#FEC943',
    },
    text: {
      primary: '#343434',
      secondary: '#2C2535',
      disabled: '#BDBDBD',
    },
    grey: {
      '50': '#f2f2f2',
      '100': '#eaeaeb', //avatar background
      '200': '#D6D6D6', //disabled categories
      '300': '#A09BA8',
      '400': '#F4F4F4', //selected categories
      '500': '#EFEFEF',
      '600': '#161419', //search input border
      '700': '#EAEAEA', //profile inputs bottom line
      '800': '#2F3A45',
      '900': '#20262D',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    error: {
      '50': '#FFF0F1',
      '100': '#FFDBDE',
      '200': '#FFBDC2',
      '300': '#FF99A2',
      '400': '#FF7A86',
      '500': '#FF505F',
      '600': '#EB0014',
      '700': '#C70011',
      '800': '#94000D',
      '900': '#570007',
      main: '#FF6565',
      light: '#FF99A2',
      dark: '#C70011',
      contrastText: '#fff',
    },
    success: {
      '50': '#E9FBF0',
      '100': '#C6F6D9',
      '200': '#9AEFBC',
      '300': '#6AE79C',
      '400': '#3EE07F',
      '500': '#0ADC8E', //online
      '600': '#1DB45A',
      '700': '#1AA251',
      '800': '#178D46',
      '900': '#0F5C2E',
      main: '#1AA251',
      light: '#6AE79C',
      dark: '#1AA251',
      contrastText: '#fff',
    },
    warning: {
      '50': '#FFF9EB',
      '100': '#FFF4DB',
      '200': '#FFEDC2',
      '300': '#FFE4A3',
      '400': '#FFD980',
      '500': '#FCC419',
      '600': '#FAB005',
      '700': '#F1A204',
      '800': '#DB9A00',
      '900': '#8F6400',
      main: '#F1A204',
      light: '#FFE4A3',
      dark: '#F1A204',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: '#fff',
      default: '#E6E1EE',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: '#BDBDBD',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Poppins,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    h1: {
      fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1.1142857142857143,
      color: '#0A1929',
    },
    h2: {
      fontSize: '32px',
      fontWeight: 500,
      lineHeight: '32px',
      color: '#2C2535',
    },
    h3: {
      fontSize: '24px',
      lineHeight: 1,
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.75rem',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.5rem',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 400,
    },
    h6: {
      fontSize: '18px',
      lineHeight: '20px',
      letterSpacing: 0,
      fontWeight: 400,
      color: '#2C2535',
    },
    button: {
      textTransform: 'initial',
      fontWeight: 700,
      letterSpacing: 0,
      fontSize: '0.875rem',
      lineHeight: 1.75,
    },
    subtitle1: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 400,
      color: '#908C97',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: 1.25,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 400,
    },
    caption: {
      color: '#908C97',
      opacity: 0.7,
      display: 'inline-block',
      fontSize: '16px',
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 500,
    },
    overline: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
  },
  shadows: [
    'none',
    '0px 0px 0px 2.5px #8674DB1A', //1 inputs hover
    '0px 24px 64px 0px #C8C3D066', //2 option button
    '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
    '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.07),0px 1px 18px 0px rgba(0,0,0,0.06)',
    '0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.07),0px 2px 16px 1px rgba(0,0,0,0.06)',
    '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
    '0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.07),0px 3px 16px 2px rgba(0,0,0,0.06)',
    '0px 6px 6px -3px rgba(0,0,0,0.1),0px 10px 14px 1px rgba(0,0,0,0.07),0px 4px 18px 3px rgba(0,0,0,0.06)',
    '0px 6px 7px -4px rgba(0,0,0,0.1),0px 11px 15px 1px rgba(0,0,0,0.07),0px 4px 20px 3px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1),0px 12px 17px 2px rgba(0,0,0,0.07),0px 5px 22px 4px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1),0px 13px 19px 2px rgba(0,0,0,0.07),0px 5px 24px 4px rgba(0,0,0,0.06)',
    '0px 7px 9px -4px rgba(0,0,0,0.1),0px 14px 21px 2px rgba(0,0,0,0.07),0px 5px 26px 4px rgba(0,0,0,0.06)',
    '0px 8px 9px -5px rgba(0,0,0,0.1),0px 15px 22px 2px rgba(0,0,0,0.07),0px 6px 28px 5px rgba(0,0,0,0.06)',
    '0px 8px 10px -5px rgba(0,0,0,0.1),0px 16px 24px 2px rgba(0,0,0,0.07),0px 6px 30px 5px rgba(0,0,0,0.06)',
    '0px 8px 11px -5px rgba(0,0,0,0.1),0px 17px 26px 2px rgba(0,0,0,0.07),0px 6px 32px 5px rgba(0,0,0,0.06)',
    '0px 9px 11px -5px rgba(0,0,0,0.1),0px 18px 28px 2px rgba(0,0,0,0.07),0px 7px 34px 6px rgba(0,0,0,0.06)',
    '0px 9px 12px -6px rgba(0,0,0,0.1),0px 19px 29px 2px rgba(0,0,0,0.07),0px 7px 36px 6px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1),0px 20px 31px 3px rgba(0,0,0,0.07),0px 8px 38px 7px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1),0px 21px 33px 3px rgba(0,0,0,0.07),0px 8px 40px 7px rgba(0,0,0,0.06)',
    '0px 10px 14px -6px rgba(0,0,0,0.1),0px 22px 35px 3px rgba(0,0,0,0.07),0px 8px 42px 7px rgba(0,0,0,0.06)',
    '0px 11px 14px -7px rgba(0,0,0,0.1),0px 23px 36px 3px rgba(0,0,0,0.07),0px 9px 44px 8px rgba(0,0,0,0.06)',
    '0px 11px 15px -7px rgba(0,0,0,0.1),0px 24px 38px 3px rgba(0,0,0,0.07),0px 9px 46px 8px rgba(0,0,0,0.06)',
  ],
});
