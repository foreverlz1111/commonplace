export function createConnection(serverUrl, roomId) {
    let connectedCallback
    let timeout
    return {
        connect() {
            timeout = setTimeout(() => {
                if (connectedCallback) {
                    console.log(roomId, " ,connected to :", serverUrl)
                    connectedCallback()
                }
            }, 100)
        },
        on(event, callback) {
            if (connectedCallback) {
                throw Error("can not add twice")
            }
            if (event !== "connected") {
                throw Error("only connect event is supported")
            }
            connectedCallback = callback
        },
        disconnect() {
            clearTimeout(timeout)
        }
    }
}
