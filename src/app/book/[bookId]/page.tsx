"use client"

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Image from 'next/image';
import { Book } from '@/types';
import DownloadButton from './components/DownloadButton';
import axios from 'axios';

const SingleBookPage = ({ params }: { params: { bookId: string } }) => {
    // State for book, loading, and error
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect for data fetching
    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`https://e-book-store-backend-2.onrender.com/api/books/${params.bookId}`);
                if (!response) {
                    throw new Error('Error fetching book');
                }
                console.log("responmse", response.data[0]);

                setBook(response.data[0]); // Set book data
                setLoading(false); // Set loading to false
            } catch (err: any) {
                setError('Error fetching book'); // Set error message
                setLoading(false); // Set loading to false
            }
        }
        console.log("book", book);


        fetchBook();
    }, [params.bookId]); // Dependency array with bookId to refetch if bookId changes

    // Display loading state
    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    // Display error message
    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    // Display book not found if book is null
    if (!book) {
        return <div className="text-center py-10">Book not found</div>;
    }

    return (
        <div className="container mx-auto px-5 py-10">
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10 max-w-6xl mx-auto">
                <div className="flex-1 md:pr-16 text-primary-950">
                    <h2 className="mb-5 text-3xl md:text-5xl font-bold leading-tight md:leading-[1.1]">
                        {book.title}
                    </h2>
                    <span className="font-semibold block mb-5">by {book?.author.name}</span>
                    <p className="text-base md:text-lg leading-7 md:leading-8 mb-5">
                        {book.description}
                    </p>
                    <DownloadButton fileLink={book.file} />
                </div>
                <div className="flex justify-center md:justify-end">
                    <Image
                        src={book.coverImage}
                        alt={book.title}
                        className="rounded-md border shadow-lg"
                        height={500}
                        width={350}
                        sizes="100vw"
                        style={{ objectFit: 'cover' }} // Ensure the image fits well
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleBookPage;
