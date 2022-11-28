const { Router } = require("express");
const router = Router();

//controllers
const { roomPost, myroomGet, viewRoom} = require("../controllers/roomController");

router.post("/add-room",roomPost);
router.get("/my-room",myroomGet);
router.get("/view-room",viewRoom)

module.exports = router;
