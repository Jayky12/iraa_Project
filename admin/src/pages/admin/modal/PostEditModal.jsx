import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, TextField, Button, FormControl,
  FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem,
  Typography, InputLabel, Container, CssBaseline, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { th } from 'date-fns/locale';
import Axios from 'axios';
import TiptapEditor from '../../../components/TiptapEditor';

export default function PostEditModal({ open, onClose, post_id, onPostUpdated }) {
  const [post_title, setPostTitle] = useState('');
  const [post_subtitle, setPostSubtitle] = useState('');
  const [post_content, setPostContent] = useState('');
  const [img, setImage] = useState(null);
  const [post_type_id, setPostTypeId] = useState('');
  const [status, setStatus] = useState('1');
  const [date, setDate] = useState(new Date());

  // โหลดข้อมูลโพสต์เมื่อ modal เปิดและ postId มีค่า
  useEffect(() => {
    if (open && post_id) {
      Axios.get(`http://localhost:5000/api/posts/${post_id}`)
        .then((res) => {
          const data = res.data;
          setPostTitle(data.post_title);
          setPostSubtitle(data.post_subtitle);
          setPostContent(data.post_content);
          setImage(data.image); // Assuming image URL is returned
          setPostTypeId(data.post_type_id.toString());
          setStatus(data.status.toString());
          setDate(new Date(data.date));
        })
        .catch((err) => {
          console.error("โหลดโพสต์ล้มเหลว:", err);
          alert("เกิดข้อผิดพลาดในการโหลดโพสต์");
        });
    }
  }, [open, post_id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('คุณต้องการยกเลิกการแก้ไขหรือไม่?');
    if (confirmCancel) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    const confirmSave = window.confirm('คุณต้องการบันทึกการแก้ไขหรือไม่?');
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
      const response = await Axios.put(`http://localhost:5000/api/posts/update/${post_id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('อัปเดตสำเร็จ:', response.data);
      alert('บันทึกการแก้ไขโพสต์แล้ว!');
      onPostUpdated();
      onClose();
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('ไม่สามารถบันทึกการแก้ไขได้');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          แก้ไขโพสต์
          <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 1000, mx: 'auto', pt: 5, px: 5, pb: 5, mt: 5, bgcolor: '#fff', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" gutterBottom>แก้ไขโพสต์</Typography>
              <TextField fullWidth label="ชื่อเรื่อง" value={post_title} onChange={(e) => setPostTitle(e.target.value)} margin="normal" />
              <TextField fullWidth label="คำอธิบายสั้น" value={post_subtitle} onChange={(e) => setPostSubtitle(e.target.value)} margin="normal" />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>เนื้อหา</Typography>
              <TiptapEditor content={post_content} onChange={setPostContent} />
              <Typography variant="subtitle1">รูปภาพ (อัปเดตหากต้องการเปลี่ยน)</Typography>
              <input type="file" onChange={handleImageChange} style={{ marginBottom: 20 }} />
              <FormControl fullWidth margin="normal">
                <InputLabel>หมวดหมู่</InputLabel>
                <Select value={post_type_id} onChange={(e) => setPostTypeId(e.target.value)} label="หมวดหมู่">
                  <MenuItem value="1">ประชาสัมพันธ์</MenuItem>
                  <MenuItem value="2">กิจกรรมบุคลากร</MenuItem>
                  <MenuItem value="3">อื่น ๆ</MenuItem>
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
                  <DateTimePicker value={date} onChange={setDate} renderInput={(params) => <TextField fullWidth {...params} />} />
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
  );
}
