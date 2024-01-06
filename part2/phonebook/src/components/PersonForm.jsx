
const PersonForm = ({name, onNameChange, phoneNumber, onPhoneNumberChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={name} onChange={onNameChange}/>
            </div>
            <div>
                number: <input value={phoneNumber} onChange={onPhoneNumberChange}/>
            </div>
            <div>
                <button type="submit" disabled={name.length === 0 || phoneNumber.length === 0}>add</button>
            </div>
        </form>
    )
}

export default PersonForm