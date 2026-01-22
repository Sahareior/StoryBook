import React from 'react';
import { GiTreeBranch } from 'react-icons/gi';


  const cardData = [
    {
      img : '/images/homepage/gradeLvl/🌈.png',
      title:'Grade 3',
      subTitle:'Confident Readers'
    },
    {
      img : '/images/homepage/gradeLvl/🚀.png',
      title:'Grade 4',
      subTitle:'Advanced Readers'
    },
    {
      img : '/images/homepage/gradeLvl/🌟.png',
      title:'Grade 5',
      subTitle:'Expert Readers'
    },
  ]

const Card = ({ data }) => {

  return (
    <div
      className="flex w-56 h-52 hover:border-2 hover:border-[#FFD700] p-4 my-4 md:my-7 px-4 md:px-8 rounded-3xl flex-col justify-center items-center gap-3"
      style={{ boxShadow: '0px 4px 6px -4px #0000001A, 0px 10px 15px -3px #0000001A' }}
    >
      <img src={data?.img} alt="" />
      <h2 className="text-xl md:text-xl font-semibold text-center headerFont">{data?.title}</h2>
      <p className="text-sm md:text-[16px] text-center normalFont">{data?.subTitle}</p>
    </div>
  );
};

const GradeLevel = () => {
  return (
    <div className='py-8 md:py-12'>
      <p className="headerFont text-2xl md:text-3xl lg:text-[36px] text-center text-black font-semibold px-4 pb-4">
        Choose Your Grade Level
      </p>
      <p className='normalFont text-center text-base md:text-[20px] mt-1 text-[#4A5565] px-4'>Pick your grade to see stories just right for you!</p>

      <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-12 lg:px-24 mt-8 gap-6">
        {cardData.map((item) => (
          <Card key={item.title} data={item} />
        ))}
      </div>
    </div>
  );
};

export default GradeLevel;
