const teamAbbreviations = [
    'ATL', // Atlanta Hawks
    'BOS', // Boston Celtics
    'BKN', // Brooklyn Nets
    'CHA', // Charlotte Hornets
    'CHI', // Chicago Bulls
    'CLE', // Cleveland Cavaliers
    'DAL', // Dallas Mavericks
    'DEN', // Denver Nuggets
    'DET', // Detroit Pistons
    'GSW', // Golden State Warriors
    'HOU', // Houston Rockets
    'IND', // Indiana Pacers
    'LAC', // Los Angeles Clippers
    'LAL', // Los Angeles Lakers
    'MEM', // Memphis Grizzlies
    'MIA', // Miami Heat
    'MIL', // Milwaukee Bucks
    'MIN', // Minnesota Timberwolves
    'NO', // New Orleans Pelicans
    'NYK', // New York Knicks
    'OKC', // Oklahoma City Thunder
    'ORL', // Orlando Magic
    'PHI', // Philadelphia 76ers
    'PHX', // Phoenix Suns
    'POR', // Portland Trail Blazers
    'SAC', // Sacramento Kings
    'SAS', // San Antonio Spurs
    'TOR', // Toronto Raptors
    'UTAH', // Utah Jazz
    'WAS', // Washington Wizards
]

interface TeamData {
    abbreviation: string
    standingSummary: string
    wins: number
    loses: number
}

export async function fetchTeamData(team: string): Promise<TeamData | null> {
    try {
        const response = await fetch(
            `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team}/schedule`
        )
        const data = await response.json()
        return {
            abbreviation: team,
            standingSummary: data.team?.standingSummary,
            wins: Number(data.team?.recordSummary?.split('-')[0]),
            loses: Number(data.team?.recordSummary?.split('-')[1]),
        }
    } catch (error) {
        console.error(`Error fetching data for team: ${team}`, error)
        return null
    }
}

export async function fetchAllTeamsData(): Promise<TeamData[]> {
    const teamDataPromises = teamAbbreviations.map(fetchTeamData)
    const allTeamsData = await Promise.all(teamDataPromises)
    return allTeamsData.filter(
        (teamData): teamData is TeamData => teamData !== null
    )
}

interface StructuredData {
    [division: string]: TeamData[]
}

export function structureDataByDivision(teamData: TeamData[]): StructuredData {
    return teamData.reduce((acc: StructuredData, team: TeamData) => {
        const division = team.standingSummary.split(' in ')[1]
        if (!acc[division]) {
            acc[division] = []
        }
        acc[division].push(team)
        return acc
    }, {})
}
