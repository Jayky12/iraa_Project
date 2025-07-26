// PostCreateModal.jsx
import React ,{ useState } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import {
    Box,
    Grid,
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    Typography,
    InputLabel,
    Container,
    CssBaseline,
  } from '@mui/material';
  import { EditorContent, useEditor } from '@tiptap/react';
  import StarterKit from '@tiptap/starter-kit';
  import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
  import { LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { th } from 'date-fns/locale';
  import Axios from 'axios';
  import TiptapEditor from '../../../components/TiptapEditor';
  import IconButton from '@mui/material/IconButton';
  import CloseIcon from '@mui/icons-material/Close';


export default function PostCreateModal({ open, onClose, onPostCreated }) {
  const [post_title, setPostTitle] = useState('');
  const [post_subtitle, setPostSubtitle] = useState('');
  const [post_content, setPostContent] = useState('');
  const [img, setImage] = useState(null);
  const [post_type_id, setPostTypeId] = useState('');
  const [status, setStatus] = useState('1');
  const [date, setDate] = useState(new Date());

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('คุณต้องการยกเลิกการสร้างโพสต์หรือไม่?')
    if (confirmCancel) {
      onClose()
    }
  }

  const handleSubmit = async () => {
    const confirmSave = window.confirm('คุณต้องการบันทึกโพสต์นี้หรือไม่?');
  if (!confirmSave) return;

    const formData = new FormData();
    formData.append('post_title', post_title);
    formData.append('post_subtitle', post_subtitle);
    formData.append('post_content', post_content);
    formData.append('post_type_id', post_type_id);
    formData.append('status', status);
    formData.append('date', date.toISOString());
    if (img) {
      formData.append('image', img);
    }


    try {
      const response = await Axios.post('http://localhost:5000/api/posts/postcreate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('โพสต์สำเร็จ:', response.data);
      alert('บันทึกโพสต์สำเร็จแล้ว!');
      onClose();
      onPostCreated();
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  };
  return (
    <React.Fragment>
    <CssBaseline />
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>สร้างโพสต์ใหม่
      <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
                <Container maxWidth="lg" sx={{ mt: '50px', mb: 5 }}>
                    <Box sx={{ maxWidth: 1000, mx: 'auto', pt: 5, px: 5 ,pb: 5,mt: 5, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h5" gutterBottom>เพิ่มโพสต์</Typography>
                            <TextField
                                fullWidth
                                label="ชื่อเรื่อง"
                                value={post_title}
                                onChange={(e) => setPostTitle(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="คำอธิบายสั้น"
                                value={post_subtitle}
                                onChange={(e) => setPostSubtitle(e.target.value)}
                                margin="normal"
                            />
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>เนื้อหา</Typography>
                        <TiptapEditor content={post_content} onChange={setPostContent} />
                        <Typography variant="subtitle1">รูปภาพ</Typography>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                style={{ marginBottom: 20 }}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>หมวดหมู่</InputLabel>
                                    <Select value={post_type_id} onChange={(e) => setPostTypeId(e.target.value)} label="หมวดหมู่">
                                    <MenuItem value="1">- select category -</MenuItem>
                                    <MenuItem value="1">ประชาสัมพันธ์</MenuItem>
                                    <MenuItem value="2">กิจกรรมบุคลากร</MenuItem>
                                    <MenuItem value="3"></MenuItem>
                                    </Select>
                            </FormControl>
                            <FormControl component="fieldset" sx={{ mt: 2 }}>
                                <FormLabel>สถานะ</FormLabel>
                                    <RadioGroup row value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <FormControlLabel value="1" control={<Radio />} label="แสดง" />
                                        <FormControlLabel value="2" control={<Radio />} label="ซ่อน" />
                                    </RadioGroup>
                            </FormControl>
                            <Box sx={{ mt: 3 }}>
                                <FormLabel>ตั้งเวลาแสดงเนื้อหา</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
                                        <DateTimePicker
                                            value={date}
                                            onChange={setDate}
                                            renderInput={(params) => <TextField fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 2 }}>
                                บันทึก
                                </Button>
                                <Button variant="outlined" onClick={handleCancel} color="error">ยกเลิก</Button>
                            </Box>
                    </Box>
                </Container>
            
      </DialogContent>
    </Dialog>
    </React.Fragment>
  )
}
