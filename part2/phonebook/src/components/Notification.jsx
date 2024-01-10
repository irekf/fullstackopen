
export const MessageType = Object.freeze({
    Info: 'Info',
    Error: 'Error',
});

const Notification = ({message, messageType}) => {

    const style = {
        color: 'white',
        background: 'white',
        fontSize: '20px',
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    if (message == null) {
        return (
            <div style={style}>
                &nbsp;
            </div>
        )
    }

    style.background = 'lightgrey'
    style.borderColor = 'black'

    switch (messageType) {
        case MessageType.Info:
            style.color = 'green'
            break
        case MessageType.Error:
            style.color = 'red'
            break
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification