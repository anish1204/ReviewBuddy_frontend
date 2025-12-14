import React from 'react';
import { MdDashboard } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { HiStar } from "react-icons/hi";
import Link from "next/link";

const Index = () => {

  const menuData = [
    {
      icon: <MdDashboard size={40} className="text-blue-600" />,
      title: "Dashboard",
      desc:"Get an overview about all your activities and analysis of all your buisness",
      link: "/vendor/reviews"
    },
    {
      icon: <BsBoxSeam size={40} className="text-green-600" />,
      desc:"Checkout all your products, create new and open new doors for innovation ",
      title: "Products",
      link: "/vendor/products"
    },
    {
      desc:"Feedbacks lead to great insight and next step to building a great idea",
      icon: <HiStar size={40} className="text-yellow-600" />,
      title: "Reviews",
      link: "/vendor/reviews"
    }
  ];

  return (
    <div className='lg:min-h-screen pt-10'>
      <div className="w-[90%] mx-auto lg:mt-20 flex flex-wrap lg:gap-4 gap-4 items-start justify-center">
        {menuData.map((item, index) => (
          <Link 
            key={index}
            href={item.link}
            className='lg:w-[30%] w-[90%] rounded-xl shadow-md hover:shadow-2xl transition p-5 min-h-[12rem] bg-gray-100 flex flex-col'
          >
            <div className='flex justify-between items-center mb-4'>
              <p className='text-2xl font-semibold'>{item.title}</p>
              {item.icon}
            </div>
            <p className='text-gray-500 font-medium text-md'>
                {item?.desc}
                </p>
                <p className="border-b-[1px] pb-[0.2rem] border-gray-500 mt-4 text-gray-500 w-fit">
                    Click Here
                </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
