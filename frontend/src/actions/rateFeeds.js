import axios from "axios";

const rateFeeds = (endpoint, rating, newsId, id, callback) => {
    console.log(endpoint,rating, newsId, id)
    axios({
        method: 'POST',
        url: endpoint,
        headers: {
            'Content-Type': "application/json"
        },
        data: {
            'rating': rating,
            'newsId': newsId,
            'id': id
        }
    }).then(function (result) {
        return callback(null, result);
    }).catch((e) => {
        return callback(e, null)
    })
}

export { rateFeeds }