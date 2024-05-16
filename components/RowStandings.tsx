import React from 'react'
import Image from 'next/image'
import { useTeamContext } from '../utils/hooks/useTeamContext'
import { TeamData } from '../utils/fetchAllStandings'

const RowStandings = () => {
    const { structuredTeamsData, teamDetails } = useTeamContext()

    const division = teamDetails?.team.standingSummary.split(' in ')[1]

    if (!structuredTeamsData || !division || !teamDetails) {
        return null
    }
    const getTeamsInSameDivision = structuredTeamsData[division]

    const sortTeamsByWins = getTeamsInSameDivision.sort(
        (a: { wins: number }, b: { wins: number }) => b.wins - a.wins
    )

    return (
        <>
            <div className="flex justify-between mt-8">
                <h2 className="font-semibold text-xl ml-4">
                    {division} Standings
                </h2>
                <div className="flex gap-x-6 px-6">
                    <p className="text-gray-700">W</p>
                    <p className="text-gray-700">L</p>
                </div>
            </div>
            {sortTeamsByWins.map((team: TeamData) => (
                <div
                    className="flex border-b border-gray-200 justify-between px-4 md:px-8 py-2"
                    key={team.name}
                >
                    <div className="flex">
                        <Image
                            src={team.image}
                            alt="NBA teams LOGO"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                        <p className="font-bold ml-4">{team.name}</p>
                    </div>
                    <div className="flex text-center gap-x-5">
                        <p className="text-gray-700">{team.wins}</p>
                        <p className="text-gray-700">{team.losses}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default RowStandings
