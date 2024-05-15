import { useContext } from 'react'
import { TeamContext } from '../../components/TeamContext'

export const useTeamContext = () => {
    const context = useContext(TeamContext)
    if (!context) {
        throw new Error('useTeamContext must be used within a TeamProvider')
    }
    return context
}
