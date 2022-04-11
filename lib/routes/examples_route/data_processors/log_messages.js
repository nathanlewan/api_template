exports.echoOut = (message) => {
    console.log(`[examples_route][echo]: ${message}`)
}

exports.noPathSpecified = () => {
    console.log("[examples_route]: no path specified")
}

exports.defaultRouteMessage = () => {
    console.log("[examples_route]: route accessed")
}