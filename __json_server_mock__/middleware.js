module.exports = (req, res, next) => {
  const { body, method, path } = req;
  if (method === "POST" && path === "/login") {
    const { username, password } = body;
    if (username === "jack" && password === "123456") {
      return res.status(200).json({
        user: {
          token: "123123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名密码错误" });
    }
  }
  next();
};
