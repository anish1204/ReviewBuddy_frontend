import React from 'react'

const Loader = () => {
  return (
    <div className="containerx containery min-h-screen animate-pulse">
      <div className="w-[65%]">
        <div className="h-[30rem] bg-gray-300 rounded-lg"></div>

        <div className="mt-5 space-y-3">
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>

  )
}

export default Loader