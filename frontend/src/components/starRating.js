import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { rateFeeds } from '../actions/rateFeeds';

class StarRating extends React.Component {
    constructor() {
        super();
        this.state = {
            rating: 0
        };
    }

    componentDidMount() {
        this.setState({ rating: this.props.value })
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
        const url = this.props.endpoint + 'rateFeed'
        rateFeeds(url, nextValue, this.props.newsId, this.props.id, (err, result) => {
            if (err) alert(err)
        });
    }

    render() {
        return (
            <div>
                <StarRatingComponent
                    value={this.state.rating}
                    name={"star-rate-1"}
                    emptyStarColor={this.props.emptyStarColor}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}

export default StarRating
