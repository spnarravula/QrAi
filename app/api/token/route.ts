// pages/api/myApiRoute.ts
import { NextRequest, NextResponse } from "next/server";
import { connection, entities } from "@database";
export  async function GET(req: NextRequest) {
  const session_email =req.headers.get('email') ?? "";
       //console.log(session);

       const client = await connection.getInstance();
       const userRepository = client.getRepository(entities.User);
      
    const existing = await  userRepository.findOne({ where : { email:  session_email}}); 
          //console.log(existing);
  if (existing) {
    // User is authenticated
   return NextResponse.json({ tokens: existing?.tokens });
  } else {
    // User is not authenticated
   return NextResponse.json({ error: 'Unauthorized' });
  }
}

export  async function POST(req: NextRequest) {
  const session =await req.json();
       //console.log(session);
  
       const client = await connection.getInstance();
       const userRepository = client.getRepository(entities.User);
       
       const existing = await  userRepository.findOne({ where : { email: session.email}}); 

          //console.log(existing);
  if (existing) {
    // User is authenticated
   return NextResponse.json({ tokens: existing?.tokens });
  } else {
    // User is not authenticated
   return NextResponse.json({ error: 'Unauthorized' });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const patchData = await req.json();

    // Validate patch data (e.g., ensure required fields are present and valid)
    //if (!isValidPatchData(patchData)) {
     // return NextResponse.json({ error: 'Invalid patch data' }, { status: 400 });
    //}

    const client = await connection.getInstance();
    const courseRepository = client.getRepository(entities.User);

    const existing = await courseRepository.findOne({ where: { email: patchData.email } });

    const patch= existing;

    const tokens = existing?.tokens;
    if(patch && tokens){
    patch.tokens= tokens -1;
    }
    if (!existing) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Apply patch data to the user object
    Object.assign(existing, patch);

    await courseRepository.save(existing);

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
