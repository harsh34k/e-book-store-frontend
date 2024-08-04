"use client";
import React, { useEffect, useState } from 'react'; // Import useState to manage component state
import BookCard from './BookCard';
import { Book } from '@/types';
import axios from 'axios';
import Loading from '@/components/Loading';
import { RiLoader5Fill } from 'react-icons/ri';

const BookList = () => {
    // State to hold books data
    const [books, setBooks] = useState<Book[]>([]);
    // State to manage error messages
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(false);

    // Effect to fetch books data on component mount
    useEffect(() => {
        // Define async function to fetch data
        async function fetchBooks() {
            try {
                // Fetch books data
                setIsLoading(true);
                const response = await axios.get('https://e-book-store-backend-2.onrender.com/api/books/all');
                console.log('response', response);

                // Set books data to state
                setBooks(response.data);
                setIsLoading(false)
            } catch (error) {
                // Log and set error to state
                setIsLoading(false)
                console.error('An error occurred while fetching the books:', error);
                setError('An error occurred while fetching the books');
            }
        }

        fetchBooks();
    }, []); // Empty dependency array to run once on component mount

    // Conditional rendering based on error state
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (<>
        {isLoading ? <div className='flex flex-col '><RiLoader5Fill className="animate-spin m-auto text-4xl" /> <Loading message="Fetching book data it might take some time, please wait..." /></div>
            :
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
                {books.map((book: Book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        }
    </>
    );
    //
};

export default BookList;
