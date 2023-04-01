import cookie from 'cookie'
import { API_URL } from '@/configs/index'

export default async (req, res) => {
  //console.log(req.method, req.body)
  if (req.method === 'POST') {
    const strapiRes = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })

    const data = await strapiRes.json()

    if (data.data !== null) {
      // Set Cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json({ user: data.user })
    } else {
      res
      .status(data.error.status)
      .json({ error: data.error.message });
    }
  } else {
    res.setHeader("Allow", ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}