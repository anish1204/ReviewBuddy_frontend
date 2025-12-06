import React from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import Button from './components/Button';
import Link from 'next/link';

const index = () => {
  return (
    <div className='lg:h-screen flex flex-col items-center justify-center '>
      <div className=''>
        <h1 className='text-3xl font-bold text-center '>
          ReviewBuddy
        </h1>
        <p className='text-sm font-medium text-center mt-3 '>
          An online platform to get feedbacks for your products live from your true customers
        </p>
        <Link href={"/register"} className='w-fll flex justify-center mt-3 items-center'>
            <Button title={"Start Now"} type={"primary"}/>
        </Link>
      </div>
      {/* <VoiceRecorder /> */}
    </div>
  )
}

export default index