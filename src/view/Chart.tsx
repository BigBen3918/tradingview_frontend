import { useEffect, useRef } from "react";

function Chart() {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const getTradingView = () => {
            const script = document.createElement("script");
            script.src =
                "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
                "autosize": true,
                "symbol": "BITSTAMP:ETHUSD",
                "interval": "1",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": true,
                "withdateranges": true,
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "details": true,
                "hotlist": true,
                "calendar": true,
                "support_host": "https://www.tradingview.com"
            }`;
            container?.current?.appendChild(script);
        };

        return () => {
            getTradingView();
            container.current = null;
        };
    }, []);

    return (
        <div className="p-5 mt-10">
            <div className="h-[500px] sm:h-[700px] border-4 border-red-400">
                <div
                    className="tradingview-widget-container w-full h-full"
                    ref={container}
                >
                    <div
                        className="tradingview-widget-container__widget"
                        style={{ height: "calc(100% - 32px)", width: "100%" }}
                    ></div>
                    <div className="tradingview-widget-copyright">
                        <a
                            href="https://www.tradingview.com/"
                            rel="noopener nofollow"
                            target="_blank"
                        >
                            <span className="blue-text">
                                Track all markets on TradingView
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chart;
