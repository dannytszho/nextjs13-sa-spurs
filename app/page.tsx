import React from 'react'
import Image from 'next/image'

function Row({
    image,
    name,
    score,
    win,
    date,
}: {
    image: string
    name: string
    score: string
    win: boolean
    date: string
}) {
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
                    alt="SA Spurs LOGO"
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

export default async function HomePage() {
    const res = await fetch(
        'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/24/schedule'
    )
    const data = await res.json()

    const events = data.events.map(
        (event: { competitions: { competitors: any[] }[] }) => {
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
                (competitor) => competitor.id === '24'
            )
            const otherTeam = competitors.find(
                (competitor) => competitor.id !== '24'
            )

            return {
                date: event.competitions[0].date,
                name: otherTeam.name,
                logo: otherTeam.logo,
                score:
                    otherTeam.score &&
                    `${otherTeam.score}-${favoriteTeam.score}`,
                winner: favoriteTeam.winner,
            }
        }
    )

    console.log(events)

    return (
        <>
            {/* <Row
                image="https://a.espncdn.com/i/teamlogos/nba/500/sa.png"
                name="San Antonio Spurs"
                score="88-100"
                win
            /> */}

            <h2 className="font-semibold text-xl ml-4">Schedule</h2>
            <h3 className="font-semibold text-gray-700 mb-2 ml-4">Full</h3>

            {events.map(
                (event: {
                    logo: string
                    name: string
                    score: string
                    winner: boolean
                    date: string
                }) => {
                    return (
                        <Row
                            key={event.name}
                            image={event.logo}
                            name={event.name}
                            score={event.score}
                            win={event.winner}
                            date={event.date}
                        />
                    )
                }
            )}
        </>
    )
}
