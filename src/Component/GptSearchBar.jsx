import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useRef, useState } from 'react';
import { API_KEY } from '../utils/constants';

const GptSearchBar = () => {
    const SearchText = useRef()
    const [query, setQuery] = useState("")

    const handleSearch = async () => {
        const value = SearchText?.current?.value;
        console.log(value);
        

        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Ensure prompt is passed as a string
            const prompt = "Give answer of the asked question line by line Not in a single line : " +value + ", Please write solution like real Gemini " ;
            // const prompt = "Hindi movies"

            const result = await model.generateContent( prompt );
            console.log("AI Response:", result.response.text());
            setQuery(result.response.text())

        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    return (
        <div className=''>
            <form className="ml-[30%] rounded-lg m-5 bg-black w-[40%]" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="border border-black rounded-lg p-6 font-semibold w-96 h-10"
                    type="text"
                    placeholder="Search your query..."
                    ref={SearchText}
                />
                <button
                    onClick={handleSearch}
                    className="ml-6 bg-red-600 p-4 font-bold text-white rounded-lg"
                >
                    Search
                </button>
            </form>

            <div className='bg-gray-200 w-2/5 ml-[30%] rounded-lg '>
                <p className='font-semibold text-lg'>{query}</p>
            </div>

        </div>
    );
};

export default GptSearchBar;
