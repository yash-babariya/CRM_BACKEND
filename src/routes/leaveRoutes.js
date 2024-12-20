
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const { checkUserRole } = require('../middleware/checkRole');
const { createAttendance, getAllAttendances, getAttendanceById, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');

router.post('/create-attendance', authenticateUser, checkUserRole('super-admin'), createAttendance);
router.get('/get-all-attendances', authenticateUser, checkUserRole('super-admin'), getAllAttendances);
router.get('/get-attendance/:id', authenticateUser, checkUserRole('super-admin'), getAttendanceById);
router.put('/update-attendance/:id', authenticateUser, checkUserRole('super-admin'), updateAttendance);
router.delete('/delete-attendance/:id', authenticateUser, checkUserRole('super-admin'), deleteAttendance);

module.exports = router;
