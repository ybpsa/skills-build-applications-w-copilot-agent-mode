import DataTable from './DataTable.jsx'
import useList from '../useList.js'

const columns = [
  { label: 'Name', render: (t) => t.name },
  { label: 'Description', render: (t) => t.description },
  { label: 'Members', render: (t) => t.members?.length ?? 0 },
]

export default function Teams() {
  const state = useList('teams')
  return <DataTable title="Teams" state={state} columns={columns} />
}
