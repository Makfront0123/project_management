import { useAuthStore } from '@/features/auth/store/auth_store'
import { ContactCard } from '@/features/chat/components/ContactCard'
import { useContactsFilter } from '@/features/chat/hooks/useContactFilter'
import { useTeamMembers } from '@/features/team/hooks/useTeamMembers'
import { Input } from '@/shared/components/ui/input'
import { useParams } from 'react-router'

const ContactsPage = () => {
  const { teamId } = useParams<{ teamId: string }>()
  const members = useTeamMembers(teamId ?? "");
  const { user } = useAuthStore()

  const { search, setSearch, filteredContacts } =
    useContactsFilter(members)
  return (
    <div className='min-w-[48vh] p-5 bg-gray-100 dark:bg-[#171717]'>
      <span className='text-2xl font-medium text-black dark:text-white'>All Chats</span>
      <Input
        placeholder="Search contacts..."
        value={search}
        className='mt-5'
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col gap-4 mt-6">
        {filteredContacts.map((member) => {
          if (member.userId._id === user?.id) return null
          return <ContactCard key={member._id} member={member} />
        })}
      </div>
    </div>
  )
}

export default ContactsPage