const jwt = require("jsonwebtoken");

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    "access_token",
    { expiresIn: "1h" }
  );
  return access_token;
};
// `${process.env.ACCESS_TOKEN}`
const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );
  return refresh_token;
};

const refreshTokenJWTService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const userDetail = await User.find({
      //   _id: _id,
      // });
      // if (userDetail === null) {
      //   resolve({
      //     status: "Ok",
      //     message: "The user is not defined",
      //   });
      // }
      console.log("token service", token);
      jwt.verify(token, "refresh_token", async function(err, user) {
        if (err) {
          return res.status(400).json({
            message: "the authemtication",
            status: "error",
          });
        }
         //khi lays được user từ refresh token và tạo access token mới cho user đó
        const {payload} = user;
        console.log(payload)
        const access_token = await genneralAccessToken({
        id: payload.id,
        isAdmin: payload?.isAdmin
        });
        console.log("access_token",access_token);
        resolve({
            status: "Ok",
            message: "SUCCES",
            access_token: access_token
          })
      });
     
     
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJWTService,
};

// `${process.env.REFRESH_TOKEN}`
