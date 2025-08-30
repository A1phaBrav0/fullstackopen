const Filter = ({searchStr, handleSearchFocus}) =>
    <div>
        Filter shown with <input value={searchStr} onChange={handleSearchFocus}/>
    </div>

export default Filter