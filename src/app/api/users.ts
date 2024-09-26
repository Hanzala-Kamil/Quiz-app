import { NextApiRequest, NextApiResponse } from 'next'; // Import Next.js types
import { connectToDatabase } from "@/lib/utils"; // Ensure you have this function defined to connect to your DB
import { User } from "@/models/userModel"; // Ensure this is the correct path

interface UserType {
    name: string; // Adjust based on your user schema
    email: string; // Adjust based on your user schema
    // Add other fields based on your User model
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'GET') {
        const users = await User.find({});
        return res.status(200).json(users);
    }

    if (req.method === 'POST') {
        const newUser: UserType = req.body; // Type the incoming user data
        const createdUser = new User(newUser);
        await createdUser.save();
        return res.status(201).json(createdUser);
    }

    // Method Not Allowed
    return res.status(405).json({ message: 'Method not allowed' });
}
