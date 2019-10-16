const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");
//Gets all members
router.get("/", (req, res) => {
  res.json(members);
});
//Get single members
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: "No member on this id" });
  }
});
//Creat Member
router.post("/", (req, res) => {
  //res.send(req.body);
  const newMember = {
    id: uuid.v4(), //generate random universe id
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name and email" });
  }
  members.push(newMember);
  res.json(members);//showing json formate output on the next page
  //res.redirect('/');//showing json formate output on the same page
});
//Update Member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: "update Member", member });
      }
    });
  } else {
    res.status(400).json({ msg: "No member on this id" });
  }
});
//Delete member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id === parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: "No member on this id" });
  }
});
module.exports = router;
