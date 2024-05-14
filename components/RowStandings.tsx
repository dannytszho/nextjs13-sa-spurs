import React from 'react'
import { StandingsProps } from '../utils/types'
import Image from 'next/image'

const RowStandings = ({
    name,
    wins,
    losses,
    streaks,
    image,
}: StandingsProps) => {
    return (
        <div className="flex border-b border-gray-200 justify-between px-8 py-2">
            <div className="flex">
                <Image
                    src={image}
                    alt="NBA teams LOGO"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                />
                <p className="font-bold ml-4">{name}</p>
            </div>

            <div className="flex text-center gap-x-5">
                <p className="text-gray-700">{wins}</p>
                <p className="text-gray-700">{losses}</p>
                <p className="text-gray-700 font-semibold">{streaks}</p>
            </div>
        </div>
    )
}

export default RowStandings
