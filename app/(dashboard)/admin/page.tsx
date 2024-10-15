// import FriendsComponent from "@/app/friends-page/page";
// import NotificationsComponent from "@/app/notifications-page/page";
// import StripePayment from "@/components/StripePayment";
// import { authOptions } from "@/lib/auth"
// import { getServerSession } from "next-auth"
// import Cookies from 'js-cookie'

// const Admin = async () => {
//     // const session = await getServerSession(authOptions)
//     // console.log(session);
//     // if(session?.user)
//     // {
//     //     return (
//     //         <>
//     //         <div className="text-2xl">Welcome Admin {session.user.name}</div>
//     //         <div className="mt-3">
//     //         <StripePayment/>
//     //         </div>
//     //     </>
//     //     )
//     // }
//     // return(
//     //     <h1>Please Login to access admin page</h1>
//     // )
//     const accessToken = Cookies.get('accessToken');
//     console.log(accessToken);
//     if (!accessToken) {
//         return (
//             <div>
//                 <h1>Please Sign in to access this page!</h1>
//             </div>
//         )
//     } else {
//         return (
//             <div>
//                 <NotificationsComponent />
//                 <FriendsComponent />
//                 <h1 className="text-center">Welcome to SaaS!</h1>
//             </div>
//         )
//     }
// }

// export default Admin

import Admin from "@/components/admin";
import { cookies } from 'next/headers';

const AdminPage = async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');
    if (!accessToken) {
        return (
            <div className="text-center p-4">
                <h1 className="text-2xl font-bold">Please Sign in to access this page!</h1>
            </div>
        );
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logged-in-user`, {
        headers: {
            'Authorization': `Bearer ${accessToken?.value}`
        }
    });

    const data = await response.json();
    const loggedInUser = data?.user?.name || '';

    return <Admin loggedInUser={loggedInUser} />;
};

export default AdminPage;
