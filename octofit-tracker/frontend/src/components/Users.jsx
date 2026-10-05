import DataTable from './DataTable.jsx'
import { apiUrl, parseList } from '../api.js'
import useList from '../useList.js'

const ENDPOINT = '/api/users/'

const load = (signal) =>
  fetch(apiUrl(ENDPOINT), { signal }).then(parseList)

const columns = [
  { label: 'Username', render: (u) => u.username },
  { label: 'Display name', render: (u) => u.displayName },
  { label: 'Email', render: (u) => u.email },
]

export default function Users() {
  const state = useList(load)
  return <DataTable title="Users" state={state} columns={columns} />
}
