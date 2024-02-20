const Filter = ({ filteredValue, handleFilter }) => {
  return (
    <form>
      <div>
        search name<input value={filteredValue} onChange={handleFilter} />
      </div>
    </form>
  )
}

export default Filter