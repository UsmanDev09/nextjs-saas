import StripePayment from "@/components/StripePayment";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const Admin = async () => {
    const session = await getServerSession(authOptions)
    console.log(session);
    if(session?.user)
    {
        return (
            <>
            <div className="text-2xl">Welcome Admin {session.user.name}</div>
            <div className="mt-3">
            <StripePayment/>
            </div>
        </>
        )
    }
    return(
        <h1>Please Login to access admin page</h1>
    )
}

export default Admin