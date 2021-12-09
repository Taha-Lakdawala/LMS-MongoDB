const express = require("express");
const router = express.Router();
// Middleware
const auth = require('../middleware/auth')
// Controller
const adminController = require('../controller/admin');


// Add Book
router.post('/admin/addBook', auth.isLoggedIn ,auth.isAdmin , adminController.postAddNewBook);
// Remove Book
router.patch('/admin/removeBook', auth.isLoggedIn ,auth.isAdmin , adminController.patchRemoveBook);
// Remove Book
router.delete('/admin/removeUser', auth.isLoggedIn ,auth.isAdmin , adminController.deleteRemoveUser);
// Update Book
router.put('/admin/UpdateBook', auth.isLoggedIn ,auth.isAdmin , adminController.putUpdateBook);
module.exports = router;