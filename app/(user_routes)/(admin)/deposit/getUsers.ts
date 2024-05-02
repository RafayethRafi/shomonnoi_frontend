
import useAuth from "@/lib/hooks/useAuth";

const api = process.env.NEXT_PUBLIC_API_URL;

export const  getUsers = async(token ?: string)=> {


    const users = await fetch(`${api}/admins/registered_users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const res = await users.json();

    if (users.ok) {
        //get only name attributes of the user from the response list
        const userNames = res.map((user: any) => user.name);
        return userNames;
    } else {
        console.error("Error fetching users:", res);
    }
    
}