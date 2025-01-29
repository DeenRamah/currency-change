const express = require("express");
const multer = require("multer");
const settingsController = require("../controllers/settingsController");

const router = express.Router();

// Configure multer storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes for managing school settings
router.post("/create", upload.single("logo"), settingsController.create); // Create with image
router.post("/edit", upload.single("logo"), settingsController.edit); // Edit with image
router.post("/view", settingsController.view);
router.post("/delete", settingsController.delete);
router.post("/viewAll", settingsController.viewAll);
router.post("/viewSettings", settingsController.viewSettings);

// Additional Routes for Image Handling & Public Access
router.use("/uploads", express.static("public/uploads")); // Serve uploaded images

module.exports = router;
