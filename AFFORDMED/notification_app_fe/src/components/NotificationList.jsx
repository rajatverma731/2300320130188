import { Box, Typography, Card, CardContent, Chip } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

// ─── Type colours ─────────────────────────────────────────────────────────────
const TYPE_COLORS = {
  Event:     { bg: 'rgba(124,111,247,0.12)', border: 'rgba(124,111,247,0.3)', text: '#a89ff7' },
  Result:    { bg: 'rgba(0,212,170,0.10)',   border: 'rgba(0,212,170,0.3)',   text: '#00D4AA' },
  Placement: { bg: 'rgba(255,179,71,0.10)',  border: 'rgba(255,179,71,0.3)',  text: '#ffb347' },
}

// ─── Single notification chip ─────────────────────────────────────────────────
function NotifChip({ type }) {
  const c = TYPE_COLORS[type] || {}
  return (
    <Chip
      label={type}
      size="small"
      sx={{
        bgcolor: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        fontWeight: 600,
        fontSize: '0.72rem',
      }}
    />
  )
}

// ─── Single notification card ─────────────────────────────────────────────────
function NotifCard({ notif }) {
  const dateStr  = notif.created_at || notif.timestamp || notif.date || ''
  const formatted = dateStr
    ? new Date(dateStr).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : '—'

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1.5,
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 6px 24px rgba(0,0,0,0.3)' },
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ py: '14px !important', px: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            {/* Type chip + ID */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
              {notif.type && <NotifChip type={notif.type} />}
              {notif.id   && (
                <Typography variant="caption" color="text.secondary">#{notif.id}</Typography>
              )}
            </Box>
            {/* Message body */}
            <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {notif.message || notif.content || notif.body || JSON.stringify(notif)}
            </Typography>
          </Box>
          {/* Timestamp */}
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', pt: 0.5 }}>
            {formatted}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

// ─── Exported list component ──────────────────────────────────────────────────
/**
 * NotificationList
 * Props:
 *   notifications  – array of notification objects from the API
 */
export default function NotificationList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
        <NotificationsNoneIcon sx={{ fontSize: 56, opacity: 0.25, mb: 2 }} />
        <Typography variant="body1" fontWeight={500} color="text.primary">
          No notifications found
        </Typography>
        <Typography variant="body2">
          Try changing the filter or checking the API connection.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {notifications.map((n, i) => (
        <NotifCard key={n.id ?? i} notif={n} />
      ))}
    </Box>
  )
}
