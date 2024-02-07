// pages/api/externalApi.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { RazorOrderApiRequest, RazorOrderApiResponse } from '../../../utils/PaymentTypes';

export  async function POST(
  req: NextApiRequest,
  res: NextApiResponse<RazorOrderApiResponse>,
) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return  NextResponse.json({ message: 'Only POST requests allowed' });
    return;
  }

  // Parse the request body
  const requestBody: RazorOrderApiRequest | undefined = await req.body;

  // Validate the request body (optional)
  // e.g., if (requestBody.name === undefined) { ... }

  // Call the external API with the request body
  const razorOrderApiResponse: Response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  // Handle the response from the external API
  if (razorOrderApiResponse.ok) {
    const externalData: RazorOrderApiResponse = await razorOrderApiResponse.json();
    return NextResponse.json(externalData);
  } else {
    return  NextResponse.json({ message: 'Error calling external API' });
  }
}
