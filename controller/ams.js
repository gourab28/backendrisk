const User = require('../models/userModel');
const Ama = require('../models/amsModel');
const Team = require('../models/teamModel');
const { nanoid } = require('nanoid');
// Start Admin Function //
async function signIn (req, res) {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ token });
  } catch (e) {
    res.status(400).send({
      error: { message: 'You have entered an invalid username or password' },
    });
  }
}
async function logOut (req , res) {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({
      error: { message: 'You have entered an invalid username or password' },
    });
  }
}
//end Admin function //

//start announcement function //
async function newAma (req, res) {
  const user = await User.findById(req.user.id);
  const { date, time, title, type, description, host } = req.body;
  const ama = new Ama({
        ama_id: nanoid(6),
        date,
        title,
        type,
        description,
        host
    });
  try {
    const newAma = await ama.save();
    res.status(201).json(newAma);
  } catch (e) {
    res.status(401).json({"error":"server side error"});
  }
}
async function getAmaS (req, res) {
  const allams = await Ama.find({}).sort({ _id: -1 });
  try {
      res.status(201).json(allams);
  } catch (e) {
    res.send({ message: "Error in Fetching AMA" });
  }
}
async function deleteAMA (req, res) {
  const amaID = req.params.id;
  console.log(amaID)
  const ama = await Ama.findByIdAndRemove(amaID);
  try {
     res.status(201).json({"message":"delete sucsuccessfully"});
  } catch (e) {
    res.status(201).json(e);
  }
}
async function publicAMA (res, res) {
  const pubama = await Ama.find({ pub: "publish"}).sort({ _id: -1 }).limit(3);
  try {
      res.status(201).json(pubama);
  } catch (e) {
    res.send({ message: "Error in Fetching ama"});
  }
}
async function deleteAllAMA (req, res) {
  try {
    await Ama.deleteMany({});
    res.status(201);
    res.send({"msg": "All AMA's Deleted"})
  } catch (error) {
    res.status(401);
    res.send(error);
  }
}
async function newMember (req, res) {
  const { name, position, description, twitter, linkedin, telegram, image, coverimage } = req.body;
  const team = new Team({
        name,
        position,
        description,
        twitter,
        linkedin,
        telegram,
        image,
        coverimage
    });
    console.log(team)
  try {
    const newTeammeber = await team.save();
    res.status(201).json(newTeammeber);
  } catch (e) {
    res.status(401).json(e);
  }
}
async function getMembers (req, res) {
  const allmembers = await Team.find({}).sort({ _id: -1 });
  try {
      res.status(201).json(allmembers);
  } catch (e) {
    res.send({ message: "Error in Fetching Team" });
  }
}
async function deleteMember (req, res) {
  const memberID = req.params.id;
  const delMem = await Ama.findByIdAndRemove(memberID);
  try {
     res.status(201).json({"message":"delete sucsuccessfully"});
  } catch (e) {
    res.status(201).json(e);
  }
}
module.exports = { signIn ,logOut, newAma , getAmaS , deleteAMA , publicAMA , deleteAllAMA ,newMember , getMembers , deleteMember}

