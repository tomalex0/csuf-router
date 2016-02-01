
var express = require('express')

module.exports =  function createApiRouter() {
    var router = new express.Router()

    router.post('/getProfile', function(req, res) {
        res.send('no csrf to post here')
    })

    router.get('/getProfile', function(req, res) {
        res.send('no csrf to get here')
    })

    return router
};