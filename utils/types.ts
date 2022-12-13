export interface RProps {
    image: string
    name: string
    score?: string
    win?: boolean
    date: string
}

export interface SProps {
    record: string
    standings: string
}

export interface CProps {
    id: string
    team: { shortDisplayName: string; logos: { href: string }[] }
    logo: string
    score?: { displayValue: string }
    winner: string
}

export interface RankProps {
    TeamID: number
    Division: string
    City: string
    Name: string
    Wins: string
    Losses: string
    StreakDescription: string
    teamName: { image: string }
}

export interface StandingsProps {
    name: string
    wins: string
    losses: string
    streaks: string
    image: string
}
