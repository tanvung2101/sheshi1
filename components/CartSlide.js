import Image from "next/image";
import React from "react";

const CartSlide = ({ src, width, height, name, comment, face }) => {
  return (
    <>
      <div className="p-5 p bg-[#fdf2ec] rounded-lg hover:shadow-2xl">
        <div className="flex items-center justify-start gap-x-5 mb-4">
          <Image src={`${src}`} alt="" width={width} height={height} className="rounded-full"></Image>
          <span className="uppercase font-semibold">{name}</span>
        </div>
        <p className="text-left mb-4 text-[15px] font-medium text-[#494847]">
          {comment}
        </p>
        <span className="text-sm text-left block">{face}</span>
      </div>
    </>
  );
};

export default CartSlide;
