import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C6FF7',
      light: '#a89ff7',
      dark: '#5a52d5',
    },
    secondary: {
      main: '#00D4AA',
      light: '#4dffd8',
      dark: '#00a884',
    },
    background: {
      default: '#0d0f1a',
      paper: '#141726',
    },
    divider: '#272b47',
    text: {
      primary: '#e8eaf0',
      secondary: '#6b7090',
    },
    error: { main: '#ff6b6b' },
    warning: { main: '#ffb347' },
    success: { main: '#00D4AA' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.5px' },
    h5: { fontWeight: 700, letterSpacing: '-0.3px' },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    body2: { color: '#6b7090' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#141726',
          border: '1px solid #272b47',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7C6FF7, #5a52d5)',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 6px 20px rgba(124,111,247,0.35)', opacity: 0.9 },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, borderRadius: 20 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          borderRight: '1px solid #272b47',
          backgroundColor: '#0d0f1a',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          padding: '8px 12px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(124,111,247,0.15)',
            borderLeft: '3px solid #7C6FF7',
            '&:hover': { backgroundColor: 'rgba(124,111,247,0.2)' },
          },
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: '#272b47' },
        head: { color: '#6b7090', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: { display: 'flex', justifyContent: 'center' },
      },
    },
  },
})

export default theme
