import React from 'react'
import Image from 'next/image'
import { useTeamContext } from '../utils/hooks/useTeamContext'
import { CProps } from '../utils/types'
import {
    fetchAllTeamsData,
    structureDataByDivision,
} from '../utils/fetchAllStandings'

const RowSchedule: any = () => {
    const { selectedTeam, teamDetails } = useTeamContext()

    // fetchAllTeamsData()
    //     .then((allTeamsData) => {
    //         console.log(allTeamsData)
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching team data:', error)
    //     })

    const events = teamDetails?.events.map(
        (event: {
            competitions: { competitors: CProps[]; date: string }[]
        }) => {
            const competitors = event.competitions[0].competitors.map(
                (competitor) => {
                    return {
                        id: competitor.id,
                        name: competitor.team.shortDisplayName,
                        logo: competitor.team.logos[0].href,
                        score: competitor.score?.displayValue,
                        winner: competitor.winner,
                    }
                }
            )
            const favoriteTeam = competitors.find(
                (competitor) => competitor.id === selectedTeam?.id
            )
            const otherTeam = competitors.find(
                (competitor) => competitor.id !== selectedTeam?.id
            )

            return {
                id: otherTeam?.id,
                date: event.competitions[0].date,
                name: otherTeam?.name,
                logo: otherTeam?.logo,
                score:
                    otherTeam?.score &&
                    `${otherTeam.score}-${favoriteTeam?.score}`,
                winner: favoriteTeam?.winner,
            }
        }
    )

    if (!events) {
        return
    }

    const nextGameIndex = events.findIndex(
        (event: any) => typeof event.score === 'undefined'
    )

    if (nextGameIndex === -1) {
        return (
            <>
                <h2 className="font-semibold text-xl ml-4 mt-16">Next Game</h2>
                <p className="mx-4">No upcoming games</p>
            </>
        )
    }

    const nextGame = events[nextGameIndex]
    const formattedDate = new Date(nextGame.date).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <>
            <h2 className="font-semibold text-xl ml-4 mt-16">Next Game</h2>
            <div className="flex border-b border-gray-200 justify-between px-8 py-2">
                <div className="flex">
                    <Image
                        src={nextGame.logo}
                        alt="NBA team logo"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                    <p className="font-bold ml-4">{nextGame.name}</p>
                </div>
                <div className="flex text-center">
                    {nextGame.score ? (
                        <>
                            <p className="text-gray-700">{nextGame.score}</p>
                            {nextGame.winner ? (
                                <p className="text-white ml-2 bg-green-500 w-6 h-6 rounded-full">
                                    W
                                </p>
                            ) : (
                                <p className="text-white ml-2 bg-red-500 w-6 h-6 rounded-full">
                                    L
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-700">{formattedDate}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default RowSchedule
