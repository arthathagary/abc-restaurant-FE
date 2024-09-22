import ErrorBoundary from '@/components/ErrorBoundary'
import { TableReservation } from '@/components/staff/table-reservation'
import { Reservation } from '@/components/user/reservation'
import React from 'react'

const page = () => {
  return (
    <ErrorBoundary>
    <TableReservation isStaff/>
    </ErrorBoundary>
  )
}

export default page