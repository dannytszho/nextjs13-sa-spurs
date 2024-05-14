import React from 'react'
import Image from 'next/image'
import { CProps, RankProps } from '../utils/types'
import { FaChevronDown } from 'react-icons/fa'
import { nbaStandingsData } from '../utils/index'
import RowSchedule from '../components/RowSchedule'
import RowStandings from '../components/RowStandings'
import Stat from '../components/Stat'
import TeamPicker from '../components/TeamPicker'

export default async function HomePage() {
    const res = await fetch(
        'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/cleveland/schedule'
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
    // const standingsData = await standingsRes.json()
    const standingsData = nbaStandingsData

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

    const teams = [
        {
            id: 1,
            City: 'Los Angeles',
            Name: 'Lakers',
            // teamName: { image: '/images/lakers-logo.png' },
        },
        {
            id: 2,
            City: 'Chicago',
            Name: 'Bulls',
            // teamName: { image: '/images/bulls-logo.png' },
        },
        {
            id: 3,
            City: 'Miami',
            Name: 'Heat',
            // teamName: { image: '/images/heat-logo.png' },
        },
        {
            id: 4,
            City: 'Boston',
            Name: 'Celtics',
            teamName: { image: '/images/celtics-logo.png' },
        },
        {
            id: 5,
            City: 'Golden State',
            Name: 'Warriors',
            // teamName: { image: '/images/warriors-logo.png' },
        },
        {
            id: 6,
            City: 'Brooklyn',
            Name: 'Nets',
            teamName: { image: '/images/nets-logo.png' },
        },
        {
            id: 7,
            City: 'Houston',
            Name: 'Rockets',
            // teamName: { image: '/images/rockets-logo.png' },
        },
        {
            id: 8,
            City: 'Milwaukee',
            Name: 'Bucks',
            // teamName: { image: '/images/bucks-logo.png' },
        },
        {
            id: 9,
            City: 'Philadelphia',
            Name: '76ers',
            // teamName: { image: '/images/76ers-logo.png' },
        },
        {
            id: 10,
            City: 'Toronto',
            Name: 'Raptors',
            // teamName: { image: '/images/raptors-logo.png' },
        },
    ]

    return (
        <>
            {/* <div className="flex mx-3 mt-4">
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
            </div> */}
            <TeamPicker teams={teams} />
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
