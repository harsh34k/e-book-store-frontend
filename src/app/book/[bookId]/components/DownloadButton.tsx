'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
    const { isSignedIn } = useUser(); // Get the user's authentication status
    const router = useRouter(); // Use Next.js router for navigation

    const handleDownload = () => {
        if (isSignedIn) {
            // If the user is signed in, proceed with the download
            window.open(fileLink, '_blank');
        } else {
            // If not signed in, redirect to the sign-in page
            router.push('/sign-in');
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="mt-10 h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 active:bg-primary-700">
            Download the book
        </button>
    );
};

export default DownloadButton
