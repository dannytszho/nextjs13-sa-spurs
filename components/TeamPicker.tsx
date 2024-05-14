'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaChevronDown } from 'react-icons/fa' // Import the icon from react-icons

type Team = {
    id: string
    city: string
    name: string
    teamName: string
    image: string
}

const TeamPicker = () => {
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
    const [teams, setTeams] = useState<Team[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const fetchTeamsData = async () => {
        try {
            let teamsData: Team[] = []
            const res = await fetch(
                'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams'
            )
            if (!res.ok) {
                throw new Error('Failed to fetch teams')
            }
            const data = await res.json()
            teamsData = data.sports[0].leagues[0].teams.reduce(
                (acc: Team[], nbaTeam: any) => {
                    return [
                        ...acc,
                        {
                            id: nbaTeam.team.id,
                            city: nbaTeam.team.location,
                            name: nbaTeam.team.name,
                            teamName: nbaTeam.team.abbreviation,
                            image: nbaTeam.team.logos[0].href,
                        },
                    ]
                },
                []
            )
            setTeams(teamsData)
        } catch (error) {
            console.log('Error fetching team data:', error)
        }
    }

    useEffect(() => {
        fetchTeamsData()
    }, [])

    return (
        <div className="flex flex-col mx-3 mt-4">
            <div className="relative w-full">
                <div className="flex w-full h-12 border px-3 border-gray-300 rounded-md justify-between items-center">
                    <button
                        className="flex w-full items-center p-2 outline-none bg-transparent border-none justify-between"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="flex items-center">
                            {selectedTeam ? (
                                <>
                                    <Image
                                        src={selectedTeam.image}
                                        alt={`${selectedTeam.city} ${selectedTeam.name} Logo`}
                                        width={20}
                                        height={20}
                                        className="mr-4"
                                    />
                                    {selectedTeam.city} {selectedTeam.name}
                                </>
                            ) : (
                                'Select a team'
                            )}
                        </div>
                        <FaChevronDown className="ml-2" />
                    </button>
                </div>
                {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {teams.map((team: Team) => (
                            <div
                                key={team.id}
                                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => {
                                    setSelectedTeam(team)
                                    setIsDropdownOpen(false)
                                }}
                            >
                                <Image
                                    src={team.image}
                                    alt={`${team.city} ${team.name} Logo`}
                                    width={20}
                                    height={20}
                                    className="ml-2 mr-4"
                                />
                                {team.city} {team.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedTeam && (
                <div className="mt-4 flex items-center">
                    <Image
                        src={selectedTeam.image}
                        alt={`${selectedTeam.city} ${selectedTeam.name} Logo`}
                        width={50}
                        height={50}
                        className="mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-bold">
                            {selectedTeam.city} {selectedTeam.name}
                        </h2>
                        <p>{selectedTeam.teamName}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeamPicker
