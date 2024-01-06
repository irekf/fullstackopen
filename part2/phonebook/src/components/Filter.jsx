
const Filter = ({prefix, onPrefixChange}) => {
    return <h3>Filter names with <input value={prefix} onChange={onPrefixChange}/></h3>
}

export default Filter

