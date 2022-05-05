const router = require('express').Router();
var geoip = require('geoip-lite');
const visited = require('../../../Database/AdminModels/countModel');
const iptrack = require('../../../Database/AdminModels/userTrackerModel');
router.post('/ip', async (req, res) => {
    try {
        const ip = req.body.ip;
//   console.log(ip+'Not found');
  var geo = geoip.lookup(ip);
  if(geo){
  
//   console.log("hiii"+geo);

  const result = await iptrack.updateOne(
    { ip: ip },
    {
      $setOnInsert: {
        ip: ip,
        country: geo.country,
        region: geo.region,
        city: geo.city,
      },
    },
    { upsert: true }
  );
//   console.log(result);
}
  // counting total no of users
  if (req.body) {
    const count = visited
      .updateOne(
        { _id: '61effef5dfd46e9de0053202' },
        { $inc: { clickcount: 1 } },
        { new: true }
      )
      .then((data) => {
        // console.log(data.acknowledged);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    } catch (error) {
        console.log(error);
    }
  
});
module.exports = router;
