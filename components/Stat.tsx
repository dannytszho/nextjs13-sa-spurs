'use client'
import React from 'react'
import { useTeamContext } from '../utils/hooks/useTeamContext'

const Stat = () => {
    const { selectedTeam, teamDetails } = useTeamContext()

    return (
        <div className="mx-4 mt-8">
            <h2 className="font-semibold text-xl">Summary</h2>
            {selectedTeam && teamDetails ? (
                <>
                    <div className="flex justify-between">
                        <p>Record</p>
                        <p>{teamDetails?.team.recordSummary}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Conference Ranking</p>
                        <p>{teamDetails?.team.standingSummary}</p>
                    </div>
                </>
            ) : (
                <p>Please select a team to see the summary.</p>
            )}
        </div>
    )
}

export default Stat
