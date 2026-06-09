import { useState, useEffect, useCallback } from 'react'
import {
  Box, Typography, Chip, Pagination, CircularProgress, Alert,
  ToggleButtonGroup, ToggleButton, Select, MenuItem, FormControl,
  InputLabel, Stack, Skeleton, Card, CardContent, Tooltip, IconButton,
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import EventIcon             from '@mui/icons-material/Event'
import EmojiEventsIcon       from '@mui/icons-material/EmojiEvents'
import WorkIcon              from '@mui/icons-material/Work'
import RefreshIcon           from '@mui/icons-material/Refresh'
import NotificationList      from '../components/NotificationList'

// ─── Filter definitions ──────────────────────────────────────────────────────
const NOTIF_TYPES = [
  { value: '',          label: 'All',       icon: <NotificationsNoneIcon fontSize="small" /> },
  { value: 'Event',     label: 'Event',     icon: <EventIcon             fontSize="small" /> },
  { value: 'Result',    label: 'Result',    icon: <EmojiEventsIcon       fontSize="small" /> },
  { value: 'Placement', label: 'Placement', icon: <WorkIcon              fontSize="small" /> },
]

// ─── Skeleton loader ─────────────────────────────────────────────────────────
function SkeletonCards({ count = 5 }) {
  return Array.from({ length: count }).map((_, i) => (
    <Card key={i} variant="outlined" sx={{ mb: 1.5, borderColor: 'divider' }}>
      <CardContent sx={{ py: '14px !important', px: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Skeleton variant="rounded" width={72} height={22} sx={{ borderRadius: 10 }} />
          <Skeleton variant="text"    width={40} />
        </Box>
        <Skeleton variant="text" width="85%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  ))
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)
  const [typeFilter,    setTypeFilter]    = useState('')          // filter state
  const [page,          setPage]          = useState(1)
  const [limit,         setLimit]         = useState(10)
  const [totalPages,    setTotalPages]    = useState(1)
  const [totalCount,    setTotalCount]    = useState(0)

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.set('page',  page)
      params.set('limit', limit)
      if (typeFilter) params.set('notification_type', typeFilter)

      const res  = await fetch(`/api/notifications?${params}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to fetch')

      const list  = Array.isArray(data) ? data : (data.notifications || data.data || [])
      const total = data.total || data.total_count || list.length
      const pages = data.total_pages || Math.ceil(total / limit) || 1

      setNotifications(list)
      setTotalCount(total)
      setTotalPages(pages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [page, limit, typeFilter])

  useEffect(() => { fetchNotifications() }, [fetchNotifications])

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleTypeChange  = (_, val) => { setTypeFilter(val ?? ''); setPage(1) }
  const handleLimitChange = (e)      => { setLimit(Number(e.target.value));  setPage(1) }

  return (
    <Box>
      {/* Heading */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Notification API
          <Box component="span" sx={{
            ml: 1.5, px: 1.2, py: 0.3,
            bgcolor: 'rgba(0,212,170,0.1)', color: 'secondary.main',
            border: '1px solid rgba(0,212,170,0.25)', borderRadius: 1,
            fontSize: '0.7rem', fontWeight: 700, verticalAlign: 'middle', letterSpacing: '0.5px',
          }}>GET</Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Live data from&nbsp;
          <Box component="code" sx={{ color: 'primary.light', fontSize: '0.82rem' }}>
            /evaluation-service/notifications
          </Box>
        </Typography>
      </Box>

      {/* ── Filter row ──────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
        {/* Type filter toggle */}
        <ToggleButtonGroup
          value={typeFilter}
          exclusive
          onChange={handleTypeChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: '20px !important', px: 2, py: 0.7,
              border: '1px solid', borderColor: 'divider',
              textTransform: 'none', fontWeight: 500, fontSize: '0.82rem', mx: 0.4,
              '&.Mui-selected': { bgcolor: 'rgba(124,111,247,0.15)', color: 'primary.light', borderColor: 'primary.dark' },
            },
          }}
        >
          {NOTIF_TYPES.map((t) => (
            <ToggleButton key={t.value} value={t.value}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                {t.icon} {t.label}
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Per-page + refresh */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel sx={{ fontSize: '0.82rem' }}>Per page</InputLabel>
            <Select value={limit} label="Per page" onChange={handleLimitChange} sx={{ fontSize: '0.82rem', borderRadius: 2 }}>
              {[5, 10, 20, 50].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </FormControl>

          <Tooltip title="Refresh">
            <IconButton size="small" onClick={fetchNotifications} disabled={loading}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Stats chips */}
      {!loading && !error && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
          <Chip label={`${totalCount} total`} size="small"
            sx={{ bgcolor: 'rgba(124,111,247,0.1)', color: 'primary.light', border: '1px solid rgba(124,111,247,0.2)', fontWeight: 500 }} />
          {typeFilter && (
            <Chip label={`Filtered: ${typeFilter}`} size="small" onDelete={() => handleTypeChange(null, '')}
              sx={{ bgcolor: 'rgba(255,179,71,0.1)', color: '#ffb347', border: '1px solid rgba(255,179,71,0.2)', fontWeight: 500 }} />
          )}
          <Chip label={`Page ${page} of ${totalPages}`} size="small" variant="outlined"
            sx={{ borderColor: 'divider', color: 'text.secondary', fontWeight: 500 }} />
        </Box>
      )}

      {/* Error */}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

      {/* List */}
      {loading
        ? <SkeletonCards count={limit > 10 ? 8 : 5} />
        : <NotificationList notifications={notifications} />
      }

      {/* ── Pagination ──────────────────────────────────────────────────────── */}
      {!loading && totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  )
}
