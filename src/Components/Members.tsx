import React, { useState } from "react";

export const Members = () => {
  const [session, setSession] = useState('August');
  
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#201F37] to-[#335575] text-white">
      <div className="flex justify-between p-6 border-b-2 border-blueGray-600">
        <div className="flex space-x-2 items-center">
          <span className="font-bold text-2xl">{session}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
        <div className="flex items-center space-x-2 text-blueGray-400">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="w-full text-center font-semibold text-lg py-6 flex justify-between items-center">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
          <span>Monday, August 2nd</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </span>
        </div>
        <div className="space-y-3">
          <div className="w-full rounded-xl bg-blueGray-600 bg-opacity-50 opacity-100 p-4 flex justify-between items-center">
            <div>
              <div className="font-bold text-lg flex space-x-2 items-center">
                <span>Mason Munoz</span>
                <div className="bg-green-400 w-2 h-2 rounded-full"></div>
              </div>
              <p className="text-blueGray-400">Splash Ball</p>
            </div>
            <div>
              <div className="h-7 w-7 rounded-full border-[3px] border-white"></div>
            </div>
          </div>
          <div className="w-full rounded-xl bg-blueGray-600 bg-opacity-50 opacity-50 p-4 flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">Mason Munoz</p>
              <p className="text-blueGray-400">Splash Ball</p>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}