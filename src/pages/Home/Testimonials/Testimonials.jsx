import React from 'react';

const Testimonials = () => {
    return (
         <div className="py-20 mb-20 bg-base-200 text-gray-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Trusted by 100+ Companies
          </h2>
          <div className="carousel w-full max-w-3xl mx-auto space-x-4">
            <div className="carousel-item w-full flex flex-col items-center">
              <p className="text-xl italic">
                "AssetVerse changed how we manage our remote team's equipment.
                It's a lifesaver!"
              </p>
              <div className="mt-4 font-bold">
                - Sarah J., HR Director at TechCorp
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Testimonials;