import { connectToDatabase } from "@/lib/utils"; // Ensure you have this function defined to connect to your DB
import { User } from "@/models/userModel"; // Ensure this is the correct path

export default async function handler(req: { method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any[]): any; new(): any; }; }; }) {
    await connectToDatabase();

    if (req.method === 'GET') {
        const users = await User.find({});
        return res.status(200).json(users);
    }

    if (req.method === 'POST') {
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json(newUser);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
