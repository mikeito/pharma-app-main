import { AlarmClock, HandCoins, MapPin, MapPinIcon } from "lucide-react";
import React from "react";
import { Button } from "src/components/custom/button";
import { IDrug } from "src/types";

const DrugSearchCard = ({ drug }: { drug: IDrug }) => {

    const backgroundImageStyle = {
        backgroundImage: `url('${'/meds2.png'}')`,
    };
    return (
        <div className="w-full my-2 max-w-sm lg:flex lg:max-w-full rounded-md overflow-y-auto">

            <div
                className="h-20 flex-none basis-1/3 overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none"
                style={backgroundImageStyle}
                title="Woman holding a mug"
            ></div>
            <div className="flex basis-2/3 flex-col justify-between rounded-b border-b border-l border-r border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
                <div className="mb-3">
                    <div className="mb-2 text-xl font-bold text-gray-900">
                        {drug.name}
                    </div>
                    <p className="text-sm capitalize text-gray-700 line-clamp-3">
                        {drug.description}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-3 font-semibold flex items-center gap-2">
                        <HandCoins size={16} />
                        {drug.price} XAF
                    </p>
                    <div className="flex items-center gap-2  text-black text-sm ">
                        <MapPinIcon size={16} />
                        <p>{drug.organisation.name}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button size='sm' variant="outline" className="bg-transparent border-primary text-black hover:bg-primary/30 hover:text-gray-700">Reserve</Button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DrugSearchCard;
