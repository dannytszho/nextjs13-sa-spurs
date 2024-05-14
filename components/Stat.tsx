import React from 'react'
import { SProps } from '../utils/types'

const Stat = ({ record, standings }: SProps) => {
    return (
        <div className="mx-4 mt-8">
            <h2 className="font-semibold text-xl">Summary</h2>
            <div className="flex justify-between">
                <p>Record</p>
                <p>{record}</p>
            </div>
            <div className="flex justify-between">
                <p>Conference Ranking</p>
                <p>{standings}</p>
            </div>
        </div>
    )
}

export default Stat
