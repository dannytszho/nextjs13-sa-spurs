import React from 'react'
import { RProps } from '../utils/types'
import Image from 'next/image'

const RowSchedule = ({ image, name, score, win, date }: RProps) => {
    const formattedDate = new Date(date).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
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
            <div className="flex text-center">
                <p className="text-gray-700">{score}</p>
                {score ? (
                    win ? (
                        <p className="text-white ml-2 bg-green-500 w-6 h-6 rounded-full">
                            W
                        </p>
                    ) : (
                        <p className="text-white ml-2 bg-red-500 w-6 h-6 rounded-full">
                            L
                        </p>
                    )
                ) : (
                    <p className="text-gray-700">{formattedDate}</p>
                )}
            </div>
        </div>
    )
}

export default RowSchedule
