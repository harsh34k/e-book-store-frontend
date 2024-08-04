import React from 'react';

interface LoadingProps {
    message?: string; // Optional prop
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading please wait..." }) => {
    return (
        <div className="min-h-[800px]  mx-auto max-w-7xl px-5 pb-10 mb-6">
            {message}
        </div>
    );
};

export default Loading;
