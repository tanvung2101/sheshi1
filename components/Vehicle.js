import Image from "next/image";
import React from "react";
import hotline from '@/images/hotline.png';
import chat from '@/images/chat.png';
import chatZalo from '@/images/chat-zalo.png';

const vehicle = [
  {
    id: 1,
    icon: hotline.src,
    content: "Hotline: 0123456789",
    
  },
  {
    id: 2,
    icon: chat.src,
    content: "Hotline: 0123456789",
    
  },
  {
    id: 3,
    icon: chatZalo.src,
    content: "Hotline: 0123456789",
    
  },
];

const Vehicle = () => {
  return (
    <>
      <div className="bottom-28 fixed -right-28 !z-50 w-[200px] ">
      {vehicle.length > 0 &&
        vehicle.map((item) => {
          return (
            <div
              key={item.id}
              className={` mb-2 relative `}
            >
              <div className={`${item.id === 1 ? 'animate-scale': ''} hiddenContent relative flex items-center justify-center rounded-full  w-[45px] h-[45px] bg-[#bc2029]`}>
                <Image src={`${item.icon}`} alt="" width={20} height={20}></Image>
              </div>
              <span className="iconPhone absolute left-[100%] top-[50%] translate-y-[50%] z-100 opacity-0 text-[12px] bg-[#bc2029] text-white text-center py-1 px-8">
                {item.content}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Vehicle;
// -translate-x-[225px]

