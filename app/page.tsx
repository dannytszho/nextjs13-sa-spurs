import React from 'react'
import Image from 'next/image'
import {
    RProps,
    SProps,
    CProps,
    RankProps,
    StandingsProps,
} from '../utils/types'
import { FaChevronDown } from 'react-icons/fa'

function Stat({ record, standings }: SProps) {
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

function RowStandings({ name, wins, losses, streaks, image }: StandingsProps) {
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

function RowSchedule({ image, name, score, win, date }: RProps) {
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

export default async function HomePage() {
    const res = await fetch(
        'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/24/schedule'
    )
    const data = await res.json()

    const record = data.team.recordSummary
    const standings = data.team.standingSummary

    const events = data.events.map(
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
                (competitor) => competitor.id === '24'
            )
            const otherTeam = competitors.find(
                (competitor) => competitor.id !== '24'
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

    const standingsRes = await fetch(
        'https://api.sportsdata.io/v3/nba/scores/json/Standings/2023',
        {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_API_KEY!,
            },
        }
    )
    const standingsData = await standingsRes.json()

    const teamsInSouthWest = standingsData.filter(
        (team: RankProps) => team.Division === 'Southwest'
    )

    const teamsLogoRes = await fetch(
        'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams'
    )
    const teamsLogoData = await teamsLogoRes.json()

    const teamsWithLogo = teamsLogoData.sports[0].leagues[0].teams.map(
        (t: { team: { shortDisplayName: any; logos: { href: any }[] } }) => {
            return {
                name: t.team.shortDisplayName,
                image: t.team.logos[0].href,
            }
        }
    )

    const teamsInSouthWestWithImage = teamsInSouthWest.map(
        (teamSw: { Name: any }) => {
            const teamName = teamsWithLogo.find(
                (teamName: { name: any }) => teamSw.Name === teamName.name
            )
            return { ...teamSw, teamName }
        }
    )

    const nextGame =
        events[
            events.findIndex(
                (element: { score: string }) =>
                    typeof element.score === 'undefined'
            )
        ]

    const currentTeam: RankProps = teamsInSouthWestWithImage.find(
        (team: { Name: string }) => team.Name === 'Spurs'
    )

    return (
        <>
            <div className="flex mx-3 mt-4">
                <div className="flex w-full h-12 border px-3 border-gray-300 rounded-md justify-between items-center">
                    <div className="flex items-center">
                        <Image
                            src={currentTeam.teamName.image}
                            alt="NBA teams LOGO"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                        <p className="font-bold ml-4">
                            {currentTeam.City} {currentTeam.Name}
                        </p>
                    </div>
                    <p className="text-xs text-gray-600">
                        <FaChevronDown />
                    </p>
                </div>
            </div>
            <Stat record={record} standings={standings} />
            <h2 className="font-semibold text-xl ml-4 mt-16">Next Game</h2>
            <RowSchedule
                key={nextGame.id}
                image={nextGame.logo}
                name={nextGame.name}
                date={nextGame.date}
            />

            <div className="flex justify-between mt-8">
                <h2 className="font-semibold text-xl ml-4">
                    {teamsInSouthWest[0].Division} Standings
                </h2>
                <div className="flex gap-x-5 px-5">
                    <p className="text-gray-700">W</p>
                    <p className="text-gray-700">L</p>
                    <p className="text-gray-700 font-semibold">STRK</p>
                </div>
            </div>
            {teamsInSouthWestWithImage.map((team: RankProps) => {
                return (
                    <RowStandings
                        key={team.TeamID}
                        name={team.Name}
                        wins={team.Wins}
                        losses={team.Losses}
                        streaks={team.StreakDescription}
                        image={team.teamName.image}
                    />
                )
            })}
            <h2 className="font-semibold text-xl ml-4 mt-8">Schedule</h2>
            <h3 className="font-semibold text-gray-700 mb-2 ml-4">Full</h3>

            {events.map(
                (event: {
                    id: string
                    logo: string
                    name: string
                    score: string
                    winner: boolean
                    date: string
                }) => {
                    return (
                        <RowSchedule
                            key={event.id}
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
