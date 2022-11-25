const { Router } = require("express");
const router = Router();

//controllers
const { questionPost, questionGet } = require("../controllers/roomController");

router.post("/add-question",questionPost);
router.get("/get-question",questionGet);
// router.get("/view-all",viewRooms)

module.exports = router;
