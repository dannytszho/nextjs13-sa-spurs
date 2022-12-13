export interface RProps {
    image: string
    name: string
    score: string
    win: boolean
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
