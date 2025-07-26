import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCreateModal from './modal/PostCreateModal';
import PostEditModal from './modal/PostEditModal';
import Chip from '@mui/material/Chip';

export default function Post() {
  const [posts, setposts] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [EditModalOpen, setEditModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/api/posts');
      setposts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
    setOpenCreateModal(false);
  };

  const handlePostEdit = () => {
    fetchPosts();
    setEditModalOpen(false);
  };

  const columns = [
    { field: 'post_id', headerName: 'ลำดับโพสต์', width: 70 },
    { field: 'post_title', headerName: 'ชื่อโพสต์', width: 500, sortable: false },
    { field: 'post_subtitle', headerName: 'รายละเอียด', width: 320 },
    { field: 'post_type_name', headerName: 'ประเภทโพสต์', sortable: false, width: 140 },
    { field: 'date', headerName: 'วันที่โพสต์', width: 120 },
    { field: 'status', headerName: 'สถานะ', width: 100, 
      renderCell: (params) => {
      const status = parseInt(params.row.status);
      const label = status === 1 ? 'แสดง' : 'ซ่อน';
      const color = status === 1 ? 'success' : 'warning';

      return <Chip label={label} color={color} size="small" />;
    } 
  },
    {
      field: 'edit',
      headerName: 'แก้ไข',
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setSelectedPostId(params.row.post_id);
            setEditModalOpen(true);
          }}
        >
          แก้ไข
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'ลบ',
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <Button variant="contained" color="error" size="small">ลบ</Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="auto" sx={{ px: 4, py: 4, mt: '50px' }}>
        <Paper sx={{ p: 2, display: 'flex' }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom component="div" m={2}>
                ระบบจัดการโพสต์
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }} marginX={3}>
            <Button onClick={() => setOpenCreateModal(true)} bgcolor="primary">
              + เพิ่มโพสต์
            </Button>
            <PostCreateModal
              open={openCreateModal}
              onClose={() => setOpenCreateModal(false)}
              onPostCreated={handlePostCreated}
            />
          </Box>
        </Paper>
        <Paper sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={posts}
            columns={columns}
            getRowId={(row) => row.post_id}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>

        {EditModalOpen && (
          <PostEditModal
            open={EditModalOpen}
            onClose={() => setEditModalOpen(false)}
            post_id={selectedPostId}
            onPostUpdated={handlePostEdit}
          />
        )}
      </Container>
    </React.Fragment>
  );
}
