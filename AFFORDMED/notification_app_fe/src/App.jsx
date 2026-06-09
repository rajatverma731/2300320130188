import { Box, Typography, AppBar, Toolbar } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import NotificationsPage from './pages/NotificationsPage'

const DRAWER_WIDTH = 256

function PageWrapper({ children, title }) {
  return (
    <Box sx={{ flex: 1 }}>
      {/* Top bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          top: 0,
          zIndex: 99,
        }}
      >
        <Toolbar sx={{ minHeight: '52px !important', px: 3 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 880 }}>
        {children}
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${DRAWER_WIDTH}px`,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Routes>
          {/* Notification API live viewer is now the default root */}
          <Route path="/" element={
            <PageWrapper title="Notification Dashboard">
              <NotificationsPage />
            </PageWrapper>
          } />

          {/* 404 fallback gracefully redirects to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  )
}
