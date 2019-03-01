import React from 'react'
import '../App.css';
import StarRating from './starRating';
import moment from 'moment';


class ListView extends React.Component {
    render() {
        const items = this.props.items
        return (
            <div>
                <li className="list">
                    <div className="leftpane">
                        <p>{moment.utc(items.isoDate).local().format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                    <div className="toppane">
                        <div className="listdiv">
                            <a href={items.link}>
                                <h3>{items.title}</h3>
                            </a>
                            <p>{items.content}</p>
                        </div>
                    </div>
                    <div className="rightpane">
                        {this.props.type !== 'top5' ?
                            <div>
                                <p className='textStyle'>Rate this news feed</p>
                                <StarRating
                                    value={items.rating}
                                    id={items.id}
                                    newsId={this.props.newsId}
                                    endpoint={this.props.endpoint}
                                    emptyStarColor="#D3D3D3"
                                /> </div> : ''}
                    </div>
                </li>
            </div>
        )
    }
}

export default ListView
