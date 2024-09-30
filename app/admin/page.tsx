import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'

const Admin = async () => {
    const appointments = await getRecentAppointmentList()

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href="/" className='cursor-pointer'>
                <Image
                    src="/assets/icons/logo-full.svg"
                    height={32}
                    width={162}
                    alt="logo"
                    className="h-8 w-fit"
                />
            </Link>
            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>
        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Bienvenue 👋</h1>
                <p className='text-dark-700'>Commencez la journée en gérant les nouveaux rendez-vous</p>
            </section>
            <section className='admin-stat'>
                <StatCard
                    type="programmer"
                    count={appointments.scheduledCount}
                    label="Rendez-vous programmés"
                    icon="/assets/icons/appointments.svg"
                />
                <StatCard
                    type="attente"
                    count={appointments.pendingCount}
                    label="Rendez-vous en attente"
                    icon="/assets/icons/pending.svg"
                />
                <StatCard
                    type="annuler"
                    count={appointments.cancelledCount}
                    label="Rendez-vous annulés"
                    icon="/assets/icons/cancelled.svg"
                />
            </section>
        </main>
    </div>
  )
}

export default Admin