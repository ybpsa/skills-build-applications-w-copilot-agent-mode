import DataTable from './DataTable.jsx'
import { apiUrl, parseList } from '../api.js'
import useList from '../useList.js'

const ENDPOINT = '/api/leaderboard/'

const load = (signal) =>
  fetch(apiUrl(ENDPOINT), { signal }).then(parseList)

const columns = [
  { label: 'Rank', render: (_e, i) => i + 1 },
  { label: 'User', render: (e) => e.user?.displayName ?? e.user?.username ?? e.user },
  { label: 'Team', render: (e) => e.team?.name ?? e.team },
  { label: 'Points', render: (e) => e.points },
  { label: 'Period', render: (e) => e.period },
]

export default function Leaderboard() {
  const state = useList(load)
  return <DataTable title="Leaderboard" state={state} columns={columns} />
}
