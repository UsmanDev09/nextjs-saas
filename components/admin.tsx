'use client';

import { useState, useEffect } from 'react';
import FriendsComponent from "@/app/friends-page/page";
import NotificationsComponent from "@/app/notifications-page/page";

const Admin = ({ loggedInUser }: { loggedInUser: string }) => {
    return (
        <div className="p-4">
            <NotificationsComponent />
            <FriendsComponent />
            <h1 className="text-3xl font-bold text-center mt-4">Welcome to SaaS, {loggedInUser}!</h1>
        </div>
    );
};

export default Admin;
