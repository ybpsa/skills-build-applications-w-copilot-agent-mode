export default function DataTable({ title, state, columns }) {
  const { items, loading, error } = state
  return (
    <section>
      <h2 className="mb-3">{title}</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.label}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>No data found.</td>
                </tr>
              ) : (
                items.map((item, i) => (
                  <tr key={item._id ?? item.id ?? i}>
                    {columns.map((c) => (
                      <td key={c.label}>{c.render(item, i) ?? '-'}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
