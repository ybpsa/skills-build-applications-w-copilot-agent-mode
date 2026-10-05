import DataTable from './DataTable.jsx'
import useList from '../useList.js'

const columns = [
  { label: 'Rank', render: (_e, i) => i + 1 },
  { label: 'User', render: (e) => e.user?.displayName ?? e.user?.username ?? e.user },
  { label: 'Team', render: (e) => e.team?.name ?? e.team },
  { label: 'Points', render: (e) => e.points },
  { label: 'Period', render: (e) => e.period },
]

export default function Leaderboard() {
  const state = useList('leaderboard')
  return <DataTable title="Leaderboard" state={state} columns={columns} />
}
