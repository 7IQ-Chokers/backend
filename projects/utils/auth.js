const verifyUserJWT = async(
    req,
    res,
    next
  ) => {
    const jwt_secret = configs.jwt_secret;
    const auth_header = req.headers["authorization"];
  
    if (!auth_header) {
      res.status(401).send({
        type: "error",
        message: "Unauthorized. Check Bearer token in Header",
        data: null,
      });
    } else if (!jwt_secret) {
      console.error(
        "Error obtaining JWT Secret from config",
        `Got '${jwt_secret}'`
      );
      res.status(500).send({
        type: "error",
        message: "Unknown error",
        data: null,
      });
    } else {
      try {
        const auth_token = String(auth_header).split(" ")[1];
        const jwt_payload = jwt.verify(auth_token, jwt_secret);
        const user = await User.findOne({email: jwt_payload.email});
        req.body.id = user.id;
        req.body.user = {
          email: jwt_payload.email,
        };
        next();
      } catch (error) {
        if (error.name == "TokenExpiredError") {
          console.error("JWT Expired!", "");
          res.status(401).send({
            type: "error",
            message: "Unauthorized. Token Expired",
            data: null,
          });
        } else {
          console.error("JWT Verification Error", error);
          res.status(500).send({
            type: "error",
            message: "Unknown error",
            data: null,
          });
        }
      }
    }
  };
  
module.exports = verifyUserJWT;
  