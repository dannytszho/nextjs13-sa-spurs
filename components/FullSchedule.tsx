import React from 'react'
import Image from 'next/image'
import { useTeamContext } from '../utils/hooks/useTeamContext'
import { CProps } from '../utils/types'

const FullSchedule: any = () => {
    const { selectedTeam, teamDetails } = useTeamContext()

    const events = teamDetails?.events.map(
        (event: {
            competitions: { competitors: CProps[]; date: string }[]
        }) => {
            const competitors = event.competitions[0].competitors.map(
                (competitor) => {
                    return {
                        id: competitor.id,
                        name: competitor.team.displayName,
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

            const formattedDate = new Date(
                event.competitions[0].date
            ).toLocaleString('en-US', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })

            return {
                id: otherTeam?.id,
                date: formattedDate,
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
        return null
    }

    return (
        <>
            <h2 className="font-semibold text-xl ml-4 mt-8">Schedule</h2>
            <h3 className="font-semibold text-gray-700 mb-2 ml-4">Full</h3>
            {events.length !== 0 ? (
                events.map(
                    (event: {
                        id: string
                        logo: string
                        name: string
                        score: string
                        winner: boolean
                        date: string
                    }) => {
                        return (
                            <div
                                className="flex border-b border-gray-200 justify-between px-4 md:px-8 py-2"
                                key={event.date}
                            >
                                <div className="flex">
                                    <Image
                                        src={event.logo}
                                        alt="NBA team logo"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                    <p className="font-bold ml-4">
                                        {event.name}
                                    </p>
                                </div>
                                <div className="flex text-center">
                                    {event.score ? (
                                        <>
                                            <p className="text-gray-700">
                                                {event.score}
                                            </p>
                                            {event.winner ? (
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
                                        <p className="text-gray-700">
                                            {event.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    }
                )
            ) : (
                <p className="mx-4">See you next season!</p>
            )}
        </>
    )
}

export default FullSchedule
