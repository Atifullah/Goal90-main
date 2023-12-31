// Datafeed implementation that you will add later
import Datafeed from './datafeed.js';

window.tvWidget = new TradingView.widget({
    symbol: 'BTC/USD',            // Default symbol pair
    interval: '1D',                        // Default interval
    fullscreen: true,                      // Displays the chart in the fullscreen mode
    container: 'tv_chart_container',       // Reference to the attribute of the DOM element
    datafeed: Datafeed,
    library_path: '/charting_library/',
});

