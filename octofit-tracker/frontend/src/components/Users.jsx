import DataTable from './DataTable.jsx'
import useList from '../useList.js'

const columns = [
  { label: 'Username', render: (u) => u.username },
  { label: 'Display name', render: (u) => u.displayName },
  { label: 'Email', render: (u) => u.email },
]

export default function Users() {
  const state = useList('users')
  return <DataTable title="Users" state={state} columns={columns} />
}
