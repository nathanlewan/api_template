exports.echoOut = async (message) => {
    console.log(`[examples_route][echo]: ${message}`)
}

exports.noPathSpecified = async () => {
    console.log("[examples_route]: no path specified")
}

exports.defaultRouteMessage = async () => {
    console.log("[examples_route]: route accessed")
}