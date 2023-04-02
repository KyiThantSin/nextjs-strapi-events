import { API_URL } from "@/configs/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    //console.log("header",req.headers.cookie)
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    //token
    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await strapiRes.json();
    //console.log("user-api", user)
    if (user != null) {
      res.status(200).json( {user} );
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
