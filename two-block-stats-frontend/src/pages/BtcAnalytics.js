import React, {Component} from 'react';

class BtcAnalytics extends Component {

  render() {
    let bitcoinTrendsEmbed = '<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2431_RC04/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"bitcoin","geo":"US","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"date=today%205-y&geo=US&q=bitcoin","guestPath":"https://trends.google.com:443/trends/embed/"})</script> ';
    return (
        <div className="BtcAnalytics">
            <h1>Bitcoin Analytics</h1>
            {/* <span className="googleTrends" dangerouslySetInnerHTML={{__html: bitcoinTrendsEmbed}}>
            </span> */}
        </div>
    );
  }
}

export default BtcAnalytics;