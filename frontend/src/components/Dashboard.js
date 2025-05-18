import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Fade,
  Zoom,
  useTheme,
  alpha,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const drawerWidth = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(33, 203, 243, 0.4)',
  },
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 0 8px rgba(33, 150, 243, 0.3)',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 12px rgba(33, 150, 243, 0.4)',
    },
  },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-cell': {
    borderColor: alpha(theme.palette.divider, 0.1),
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  },
  '& .MuiDataGrid-row': {
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    borderRadius: '8px 8px 0 0',
  },
}));

const LargeTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'monospace',
    fontSize: '14px',
    '& textarea': {
      minHeight: '200px',
    },
  },
}));

function Dashboard() {
  const theme = useTheme();
  const [models, setModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newModel, setNewModel] = useState({
    name: '',
    gladia: '',
    fastwhisper: '',
    yandexSpeechKit: '',
  });
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 200,
      editable: true,
    },
    { 
      field: 'gladia', 
      headerName: 'Gladia', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {params.value}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setEditField({ id: params.id, field: 'gladia', value: params.value });
              setEditValue(params.value);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    { 
      field: 'fastwhisper', 
      headerName: 'FastWhisper', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {params.value}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setEditField({ id: params.id, field: 'fastwhisper', value: params.value });
              setEditValue(params.value);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    { 
      field: 'yandexSpeechKit', 
      headerName: 'Yandex Speech Kit', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {params.value}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setEditField({ id: params.id, field: 'yandexSpeechKit', value: params.value });
              setEditValue(params.value);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/models');
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
      setError('Failed to fetch models. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateModel = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/models', newModel);
      setOpen(false);
      fetchModels();
      setNewModel({
        name: '',
        gladia: '',
        fastwhisper: '',
        yandexSpeechKit: '',
      });
    } catch (error) {
      console.error('Error creating model:', error);
      setError('Failed to create model. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAll = async () => {
    if (selectedRows.length === 0) {
      setError('Please select at least one model to update');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const updatedModels = selectedRows.map(rowId => {
        const model = models.find(m => m.id === rowId);
        return {
          ...model,
          id: rowId
        };
      });

      await axios.put('/api/models/update-all', updatedModels);
      await fetchModels();
      setError(null);
    } catch (error) {
      console.error('Error updating models:', error);
      setError('Failed to update models. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRowEditCommit = (params) => {
    const updatedModels = models.map(model => {
      if (model.id === params.id) {
        return {
          ...model,
          [params.field]: params.value
        };
      }
      return model;
    });
    setModels(updatedModels);
  };

  const handleEditFieldSave = () => {
    if (editField) {
      const updatedModels = models.map(model => {
        if (model.id === editField.id) {
          return {
            ...model,
            [editField.field]: editValue
          };
        }
        return model;
      });
      setModels(updatedModels);
      setEditField(null);
      setEditValue('');
    }
  };

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <StyledAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Speech Models Dashboard
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 3 }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ mb: 3 }}>
              <SearchTextField
                fullWidth
                placeholder="Search by name..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                }}
              />
            </Box>
          </Fade>
          <Fade in={true} timeout={1200}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <StyledButton
                fullWidth
                onClick={() => setOpen(true)}
                disabled={loading}
                startIcon={<AddIcon />}
              >
                Add New Model
              </StyledButton>
              <StyledButton
                fullWidth
                onClick={handleUpdateAll}
                disabled={loading || selectedRows.length === 0}
                startIcon={<SaveIcon />}
              >
                Save Changes
              </StyledButton>
            </Box>
          </Fade>
        </Box>
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Zoom in={true} timeout={800}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              background: 'white',
              boxShadow: '0 0 20px rgba(0,0,0,0.05)',
              height: 'calc(100vh - 100px)',
            }}
          >
            <div style={{ height: '100%', width: '100%', position: 'relative' }}>
              {loading && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 1,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <StyledDataGrid
                rows={filteredModels}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                loading={loading}
                onSelectionModelChange={(newSelection) => {
                  setSelectedRows(newSelection);
                }}
                onCellEditCommit={handleRowEditCommit}
                sx={{
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                }}
              />
            </div>
          </Paper>
        </Zoom>
      </Box>

      <Dialog 
        open={open} 
        onClose={() => !loading && setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
        }}>
          Add New Model
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newModel.name}
            onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Gladia"
            fullWidth
            value={newModel.gladia}
            onChange={(e) => setNewModel({ ...newModel, gladia: e.target.value })}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="FastWhisper"
            fullWidth
            value={newModel.fastwhisper}
            onChange={(e) => setNewModel({ ...newModel, fastwhisper: e.target.value })}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Yandex Speech Kit"
            fullWidth
            value={newModel.yandexSpeechKit}
            onChange={(e) => setNewModel({ ...newModel, yandexSpeechKit: e.target.value })}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpen(false)} 
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <StyledButton
            onClick={handleCreateModel}
            disabled={loading}
          >
            Create
          </StyledButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!editField}
        onClose={() => setEditField(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          Edit {editField?.field}
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setEditField(null)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <LargeTextField
            fullWidth
            multiline
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setEditField(null)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <StyledButton
            onClick={handleEditFieldSave}
          >
            Save Changes
          </StyledButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error"
          sx={{ 
            width: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard; 