'use client'
import React from 'react'
import { TeamProvider } from '../components/TeamContext'
import RowSchedule from '../components/RowSchedule'
import RowStandings from '../components/RowStandings'
import Stat from '../components/Stat'
import TeamPicker from '../components/TeamPicker'
import FullSchedule from '../components/FullSchedule'

export default function HomePage() {
    return (
        <TeamProvider>
            <TeamPicker />
            <Stat />
            <RowSchedule />
            <RowStandings />
            <FullSchedule />
        </TeamProvider>
    )
}
