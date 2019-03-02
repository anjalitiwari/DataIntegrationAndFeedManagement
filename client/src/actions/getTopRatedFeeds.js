import axios from "axios";

const getTopRatedFeeds = (endpoint, callback) => {
    axios({
        method: 'GET',
        url: endpoint,
        headers: {
            'Content-Type': "application/json"
        },
    }).then(function (result) {
        return callback(null, result);
    }).catch((e) => {
        return callback(e, null)
    })
}

export { getTopRatedFeeds }
