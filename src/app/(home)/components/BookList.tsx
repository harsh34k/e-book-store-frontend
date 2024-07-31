// "use client"
// import React, { useEffect } from 'react';
// import BookCard from './BookCard';
// import { Book } from '@/types';
// import axios from 'axios';

// const BookList = async () => {
//     // data fetching
//     let response;

//     try {

//         useEffect(() => {
//             async function fetchMyAPI() {
//                 let response = await axios.get(`http://localhost:8000/api/books/all`);
//                 console.log("response", response);
//                 return response.data
//             }

//             fetchMyAPI()
//         }, [])



//         if (!response) {
//             throw new Error('An error occurred while fetching the books');
//         }

//         const books = await response;

//         return (
//             <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
//                 {books.map((book: Book) => (
//                     <BookCard key={book._id} book={book} />
//                 ))}
//             </div>
//         );
//     } catch (error) {
//         console.log("error hai", error);

//     }

// };

// export default BookList;


"use client";
import React, { useEffect, useState } from 'react'; // Import useState to manage component state
import BookCard from './BookCard';
import { Book } from '@/types';
import axios from 'axios';

const BookList = () => {
    // State to hold books data
    const [books, setBooks] = useState<Book[]>([]);
    // State to manage error messages
    const [error, setError] = useState<string | null>(null);

    // Effect to fetch books data on component mount
    useEffect(() => {
        // Define async function to fetch data
        async function fetchBooks() {
            try {
                // Fetch books data
                const response = await axios.get('https://e-book-store-backend-2.onrender.com/api/books/all');
                console.log('response', response);

                // Set books data to state
                setBooks(response.data);
            } catch (error) {
                // Log and set error to state
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

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
            {books.map((book: Book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
};

export default BookList;
