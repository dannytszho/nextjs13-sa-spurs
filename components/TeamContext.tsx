import React, { createContext, useState, useEffect, useContext } from 'react'
import {
    fetchAllTeamsData,
    structureDataByDivision,
} from '../utils/fetchAllStandings'

type Team = {
    id: string
    city: string
    name: string
    teamName: string
    image: string
}

type TeamContextType = {
    selectedTeam: Team | null
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | null>>
    teamDetails: any
    setTeamDetails: React.Dispatch<React.SetStateAction<any>>
    structuredTeamsData: any
    setStructuredTeamsData: React.Dispatch<React.SetStateAction<any>>
}

export const TeamContext = createContext<TeamContextType | undefined>(undefined)

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
    const [teamDetails, setTeamDetails] = useState<any>(null)
    const [structuredTeamsData, setStructuredTeamsData] = useState<any>(null)

    useEffect(() => {
        if (selectedTeam) {
            const fetchTeamDetails = async () => {
                try {
                    const res = await fetch(
                        `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${selectedTeam?.teamName}/schedule`
                    )
                    if (!res.ok) {
                        throw new Error('Failed to fetch team details')
                    }
                    const data = await res.json()
                    setTeamDetails(data)
                } catch (error) {
                    console.error('Error fetching team details:', error)
                }
            }
            fetchTeamDetails()
            const getStructuredTeamData = async (): Promise<void> => {
                try {
                    const allTeamsData = await fetchAllTeamsData()
                    const structuredData = structureDataByDivision(allTeamsData)
                    setStructuredTeamsData(structuredData)
                } catch (error) {
                    console.error('Error structuring team data', error)
                }
            }

            getStructuredTeamData()
        }
    }, [selectedTeam])

    return (
        <TeamContext.Provider
            value={{
                selectedTeam,
                setSelectedTeam,
                teamDetails,
                setTeamDetails,
                structuredTeamsData,
                setStructuredTeamsData,
            }}
        >
            {children}
        </TeamContext.Provider>
    )
}
