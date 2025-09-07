const Search = ({value, onChange}) => {
    return (
        <div>
           Find countries <input id={"search"} value={value} onChange={onChange} />
        </div>
    )
}

export default Search