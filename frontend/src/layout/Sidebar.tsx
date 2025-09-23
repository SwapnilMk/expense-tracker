import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography, Button, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import GitHubIcon from '@mui/icons-material/GitHub';

const drawerWidth = 280;

const menuItems = [
  { text: 'Overview', path: '/', icon: <DashboardIcon /> },
  { text: 'Transactions', path: '/transactions', icon: <ReceiptLongIcon /> },
  { text: 'Add Transaction', path: '/add-transaction', icon: <AddCircleOutlineIcon /> },
];

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: [1],
      }}>
        <TrackChangesIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
          Expense Tracker
        </Typography>
      </Toolbar>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  '&.active': {
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
  

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {/* Upcoming features note */}
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 1, fontWeight: 500 }}>
            More features coming soon!
          </Typography>

          {/* Subtext */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            If you have any suggestions, connect with me at{' '}
            <Link href="mailto:mswapnil218@gmail.com" underline="hover">
              mswapnil218@gmail.com
            </Link>
          </Typography>

          {/* GitHub Repo Button */}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<GitHubIcon />}
            href="https://github.com/SwapnilMk/expense-tracker"
            target="_blank"
            sx={{ mb: 2, textTransform: 'none', fontWeight: 500 }}
            fullWidth
          >
            View on GitHub
          </Button>

        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
