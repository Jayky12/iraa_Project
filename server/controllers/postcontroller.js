const db = require('../config/db');
const multer = require('multer');
const path = require('path');


exports.getAllposts = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT post_id, post_title, post_subtitle, post_content, img, DATE_FORMAT(date, '%Y-%m-%d') AS date,
             status, pt.post_type_name
      FROM post
      LEFT JOIN post_type AS pt ON post.post_type_id = pt.post_type_id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดฝั่ง SERVER' });
  }
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      // กำหนด Path ที่จะบันทึกไฟล์ (ตรวจสอบให้แน่ใจว่า Folder นี้มีสิทธิ์ในการเขียน)
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      // กำหนดชื่อไฟล์ (ป้องกันชื่อซ้ำ)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// สร้าง Middleware สำหรับ Upload ไฟล์รูปภาพ (อัปโหลดได้ครั้งละ 1 ไฟล์ และ Field ใน Form-Data ชื่อ 'image')
const upload = multer({ storage: storage }).single('image');

exports.createPost = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์: ' + err.message });
        } else if (err) {
            return res.status(500).json({ message: 'เกิดข้อผิดพลาดฝั่ง SERVER ในการอัปโหลดไฟล์' });
        }

        try {
            const { post_title, post_subtitle, post_content, date ,post_type_id ,status } = req.body;
            const img = req.file ? req.file.path : null;

            if (!post_title || !post_content) {
                return res.status(400).json({ message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
            }

            // ดึงค่า post_id สูงสุดจากฐานข้อมูล
            const [maxPostIdResult] = await db.execute('SELECT MAX(post_id) AS maxId FROM post');
            const maxPostId = maxPostIdResult[0].maxId;

            // กำหนด post_id ใหม่
            const newPostId = maxPostId ? maxPostId + 1 : 1;

            const sql = 'INSERT INTO post (post_id, post_title, post_subtitle, post_content, date, img, post_type_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const [result] = await db.execute(sql, [newPostId, post_title, post_subtitle, post_content, date, img, post_type_id, status]);

            if (result.affectedRows > 0) {
                res.status(201).json({message: 'เพิ่มโพสต์สำเร็จ', post_id: newPostId, image_path: img });
            } else {
                res.status(500).json({ message: 'ไม่สามารถเพิ่มโพสต์ได้' });
            }

        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดฝั่ง SERVER ในการเพิ่มโพสต์' });
        }
    });
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.execute('SELECT * FROM post WHERE post_id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'ไม่พบโพสต์ที่ระบุ' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'เกิดข้อผิดพลาดฝั่ง SERVER' });
    }
  };
  
  exports.updatePost = async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError || err) {
        return res.status(500).json({ message: 'อัปโหลดไฟล์ล้มเหลว' });
      }
  
      const { post_title, post_subtitle, post_content, date, post_type_id, status } = req.body;
      const { id } = req.params;
      const img = req.file ? req.file.path : null;
  
      try {
        let sql = 'UPDATE post SET post_title=?, post_subtitle=?, post_content=?, date=?, post_type_id=?, status=?';
        const values = [post_title, post_subtitle, post_content, date, post_type_id, status];
  
        if (img) {
          sql += ', img=?';
          values.push(img);
        }
  
        sql += ' WHERE post_id=?';
        values.push(id);
  
        const [result] = await db.execute(sql, values);
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'ไม่พบโพสต์เพื่ออัปเดต' });
        }
  
        res.json({ message: 'อัปเดตโพสต์สำเร็จ' });
      } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดฝั่ง SERVER ขณะอัปเดต' });
      }
    });
  };
  
  exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await db.execute('DELETE FROM post WHERE post_id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'ไม่พบโพสต์เพื่อลบ' });
      }
      res.json({ message: 'ลบโพสต์สำเร็จ' });
    } catch (error) {
      res.status(500).json({ message: 'เกิดข้อผิดพลาดฝั่ง SERVER ขณะลบ' });
    }
  };