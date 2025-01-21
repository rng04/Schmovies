import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Dashboard() {
    const {user} = useContext(UserContext)
    return (
        <div>
            {
            !!user ? (
            <>
                <h1>Dashboard</h1>
                <h2>Hi {user.username}</h2>
            </>) :
            <h1>Sign in to see more features!</h1>
            }
        </div>
    )
}