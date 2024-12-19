import { checkboxClasses, extendTheme } from '@mui/joy'

export const theme = extendTheme({
  components: {
    JoyCheckbox: {
      styleOverrides: {
        root: {
          // Нужно, чтобы отключить подсветку фона при тапе (на телефонах)
          [`& > .${checkboxClasses.checkbox}`]: { position: 'relative' },
        },
      },
    },

    JoyContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },

    JoyFormControl: {
      styleOverrides: {
        root: ({ theme }) => ({
          '--FormHelperText-fontSize': theme.vars.fontSize.xs,
          '--FormHelperText-lineHeight': theme.vars.lineHeight.xs,
        }),
      },
    },

    JoySelect: {
      styleOverrides: {
        button: {
          display: 'block',

          textAlign: 'left',
          textOverflow: 'ellipsis',
        },
      },
    },

    JoyMenu: {
      defaultProps: {
        variant: 'plain',
        keepMounted: true,
      },
    },
    JoyMenuItem: {
      styleOverrides: {
        root: {
          userSelect: 'none',
          ':focus-visible': {
            outline: 'unset',
          },
        },
      },
    },

    JoyModalDialog: {
      styleOverrides: {
        root: {
          maxWith: 'calc(100vw - 2 * 1rem)',
          maxHeight: 'calc(100vh - 2 * 1rem)',
          width: '100%',
        },
      },
    },
    JoyModalClose: {
      styleOverrides: {
        root: {
          position: 'static',
        },
      },
    },
  },
})
