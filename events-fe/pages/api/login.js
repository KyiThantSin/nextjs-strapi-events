import { API_URL } from "@/configs/index";

export default async (req, res) => {
  console.log(req.body);
  // const { identifier, password } = req.body;
  // console.log({ identifier });
  // const body = JSON.stringify({
  //   identifier,
  //   password,
  // });
  // console.log({ body });
  if (req.method === "POST") {
    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: req.body,
    });
 
    const data = await strapiRes.json();
    console.log({ data });
    // res.json(data);
    if (data.data !== null) {
      //set cookie
      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.error.status)
        // .json({ message: data.message[0].messages[0].message });
        .json({ error: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};