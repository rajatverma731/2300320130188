import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useNavigate, useLocation } from 'react-router-dom'

const DRAWER_WIDTH = 256

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', pt: 0 },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: 2.5, py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(135deg, rgba(124,111,247,0.08), rgba(0,212,170,0.05))',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'linear-gradient(135deg, #7C6FF7, #00D4AA)',
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
              AffordMed
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Notification Hub
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ overflowY: 'auto', flex: 1, py: 2 }}>
        <List disablePadding>
          <ListItemButton
            selected={location.pathname === '/'}
            onClick={() => navigate('/')}
            sx={{ mx: 1, borderRadius: 2, py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: location.pathname === '/' ? 'primary.light' : 'text.secondary' }}>
              <NotificationsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Notifications"
              primaryTypographyProps={{
                fontSize: '0.85rem',
                fontWeight: location.pathname === '/' ? 600 : 400,
                color: location.pathname === '/' ? 'primary.light' : 'text.primary',
              }}
            />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  )
}
