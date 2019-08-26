const express = require("express");
const tokenMiddleware = require('../middleware/auth'); //middleware
const searchSchool = require("../api/school/searchSchool").searchByName;
const searchClass = require("../api/school/searchClass");
const router = express.Router();

router.get("/searchschool" , async (req, res) => {
    try {
        const schoolInfo = await searchSchool(req.query.school_name); //querystring으로 학교이름을 받아옴

        console.log("학교에 대한 정보를 조회하였습니다 school : " + req.query.school_name);
        return res.status(200).json({status : 200, message : "학교에 대한 정보를 조회하였습니다", data : {schoolInfo}});
    } catch(err) {
        if (err === 404) { //학교에 대한 정보가 없다면
            console.log("학교에 대한 정보가 없습니다 school_name : " + req.query.school_name);
            return res.status(400).json({status : 400, message : "학교에 대한 정보가 없습니다"});
        }
        
        console.log("학교에 대한 정보를 조회하는중 오류가 발생하였습니다\n" + err);
        return res.status(500).json({status : 500, message : "학교에 대한 정보를 조회하는중 오류가 발생하였습니다"});
    }
});

router.get("/searchclass", searchClass);

module.exports = router;