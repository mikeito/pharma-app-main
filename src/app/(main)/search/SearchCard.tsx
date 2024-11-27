// import { PillBottle } from 'lucide-react'
import { IconLocationPin } from '@tabler/icons-react';
import {  AlarmClock, Clock10Icon, LocateIcon, Map, MapPin, PillIcon } from 'lucide-react';
import React from 'react'
// import hospital from '/hospital.png'
// import hospital from '../../../../public/hospital.png'
const SearchCard = ({organisation}:any) => {

  console.log({organisation})
  const {type, name, description, openHours,closingHours,address, telephone, user} = organisation;

  const getImageUrl = (type: string) => {
    switch (type) {
      case 'HOSPITAL':
        return '/hospital.png';
      case 'PHARMACY':
        return '/pharmacy.png'; 
      case 'HEALTHCENTER':
        return '/healthcenter.png'; 
      default:
        return '/pharmacy.png'; 
    }
  };
  const backgroundImageStyle = {
    backgroundImage: `url('${getImageUrl(type)}')`,
  };

  return (
    <div className="w-full my-2 max-w-sm lg:flex lg:max-w-full rounded-md overflow-y-auto">
    <div
      className="h-20 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none"
      style={backgroundImageStyle}
      title="Woman holding a mug"
    ></div>
    <div className="flex flex-col justify-between rounded-b border-b border-l border-r border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
      <div className="mb-3">
        <p className="flex items-center text-sm text-gray-600">
          <PillIcon size={14} />
          {type}
        </p>
        <div className="mb-2 text-xl font-bold text-gray-900">
        {name}
        </div>
        <p className="text-sm text-gray-700 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center gap-2  justify-end text-black text-sm ">
          <AlarmClock size={16}/>
          <p>{openHours} - </p>
          <p>{closingHours}</p>
        </div>
        <div className="flex items-center gap-2  justify-end text-black text-sm ">
          <MapPin size={16}/>
          <p>{address}</p>
          <p>{telephone}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SearchCard