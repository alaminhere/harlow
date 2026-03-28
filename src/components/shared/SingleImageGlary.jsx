'use client';

import Image from 'next/image';
import { useState } from 'react';

const SingleImageGlary = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);

  return (
    <div className="flex flex-col justify-center md:w-[50%] md:flex-row">
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex-1 md:order-2">
          <Image
            className="h-full w-full object-cover"
            alt="single_image"
            src={selectedImage?.url}
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-row gap-2 md:order-1 md:flex-col">
          {product.images.map((item, index) => (
            <Image
              key={index}
              className={`h-16 w-16 cursor-pointer border bg-surface object-cover md:h-20 md:w-20 ${
                item._id === selectedImage?._id
                  ? 'border-primary'
                  : 'border-border'
              }`}
              alt="single_image"
              src={item?.url}
              width={100}
              height={100}
              onClick={() => setSelectedImage(product?.images[index])}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleImageGlary;
