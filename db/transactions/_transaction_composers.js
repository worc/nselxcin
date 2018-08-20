export function UpdateByIdComposer(task, taskName) {
    return (req, res) => {
        task(req.params.id, req.body).then((message) => {
            console.log(`${taskName}:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData)
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`)
            res.status(500).send()
        })
    }
}

export function UpdateByParamsComposer(task, taskName) {
    return (req, res) => {
        task(req.params, req.body).then(message => {
            console.log(`${ taskName }:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData)
        })
    }
}

export function DeleteByIdComposer(task, taskName) {
    return (req, res) => {
        task(req.params.id).then((message) => {
            console.log(`${taskName}:`, message)
            res.status(200).send()
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`)
            res.status(500).send()
        })
    }
}

export function DeleteByParamsComposer(task, taskName) {
    return (req, res) => {
        task(req.params, req.body).then(message => {
            console.log(`${ taskName }:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData)
        })
    }
}

export function GetByIdComposer(task, taskName) {
    return (req, res) => {
        task(req.params.id).then((message) => {
            console.log(`${taskName}:`, message)
            res.status(200).send(message)
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`)
            res.status(500).send()
        })
    }
}

export function GetAllComposer(task, taskName) {
    return (req, res) => {
        task().then((message) => {
            console.log(`${taskName}:`, message)
            res.status(200).send(message)
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`)
            res.status(500).send()
        })
    }
}

export function PostComposer(task, taskName) {
    return function(req, res) {
        task(req.body).then((message) => {
            console.log(`${taskName}:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData)
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`)
            res.status(500).send()
        })
    }
}

export function PostByParamsComposer(task, taskName) {
    return function(req, res) {
        task(req.params, req.body).then(message => {
            console.log(`${ taskName }:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData)
        })
    }
}
