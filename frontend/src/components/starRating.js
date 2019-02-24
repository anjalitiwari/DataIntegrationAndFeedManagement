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
        const url = this.props.endpoint + 'rateFeeds'
        rateFeeds(url, this.state.rating, this.props.newsId, this.props.id, (err, result) => {
            if (err) alert(err)
        });
    }

    onStarHover(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    onStarHoverOut(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
        const url = this.props.endpoint + 'rateFeed'
        rateFeeds(url, this.state.rating, this.props.newsId, this.props.id, (err, result) => {
            if (err) alert(err)
        });
    }

    render() {
        const { rating } = this.props.value;
        return (
            <div>
                <StarRatingComponent
                    value={this.state.rating}
                    name={"star-rate-1"}
                    emptyStarColor={this.props.emptyStarColor}
                    onStarClick={this.onStarClick.bind(this)}
                    onStarHover={this.onStarHover.bind(this)}
                    onStarHoverOut={this.onStarHoverOut.bind(this)}
                />
            </div>
        );
    }
}

export default StarRating
