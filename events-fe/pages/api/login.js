import { API_URL } from "@/configs/index";

export default async (res, req) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    //console.log(req.body);
    const data = await strapiRes.json();
    if (strapiRes.ok) {
      //set-cookies
      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0]?.message[0]?.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
