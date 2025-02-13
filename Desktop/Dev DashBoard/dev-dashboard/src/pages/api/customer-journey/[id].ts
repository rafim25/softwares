import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    // Replace this with your actual API call
    const response = await fetch(`YOUR_BACKEND_API_URL/customer-journey/${id}`);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching customer journey:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
