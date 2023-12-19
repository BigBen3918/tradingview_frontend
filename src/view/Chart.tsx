import { useEffect, useRef, useState } from "react";
import Action from "../service";
import { BsRepeat } from "react-icons/bs";

function Chart() {
    const [tokens, setTokens] = useState<string[]>([]);
    const container = useRef<HTMLDivElement | null>(null);

    const getTokens = async () => {
        const { name }: TradeTokenInterface = await Action.GetTradeToken();

        setTokens(name);
    };

    const getTradingView = (symbol_param: string, type_param: number) => {
        for (let i = 0; i < Number(container.current?.childElementCount); i++) {
            container.current?.removeChild(container.current?.children[i]);
        }

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = false;
        if (type_param === 1) {
            script.innerHTML = `
            {
                "symbol": "${symbol_param}",
                "autosize": true,
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": true,
                "calendar": true,
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "details": true,
                "hotlist": true,
                "withdateranges": true,
                "support_host": "https://www.tradingview.com"            
            }`;
        } else {
            const randomRange = Date.now() % 2 === 0 ? "3M" : "6M";
            console.log(randomRange);
            script.innerHTML = `
            {
                "symbol": "${symbol_param}",
                "autosize": true,
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "range": "${randomRange}",
                "enable_publishing": false,
                "hide_top_toolbar": true,
                "save_image": false,
                "hide_volume": true,
                "support_host": "https://www.tradingview.com"       
            }`;
        }
        container.current?.appendChild(script);
    };

    useEffect(() => {
        return () => {
            getTokens();
            getTradingView("BITSTAMP:ETHUSD", 1);
        };
    }, []);

    const randomChart = () => {
        for (let i = 0; i < Number(container.current?.childElementCount); i++) {
            container.current?.removeChild(container.current?.children[i]);
        }

        if (tokens.length > 0) {
            getTradingView(
                tokens[Math.floor(Math.random() * tokens.length)],
                2
            );
        } else {
            getTradingView("BITSTAMP:ETHUSD", 1);
        }
    };

    return (
        <div className="p-5">
            <div className="h-[500px] sm:h-[700px] border-4 border-red-400">
                <div
                    className="tradingview-widget-container w-full h-full"
                    ref={container}
                >
                    {/* <div
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
                    </div> */}
                </div>
            </div>

            <div className="flex justify-center items-center py-5">
                <button
                    className="flex items-center justify-center gap-2 bg-blue-600 px-10 py-2 rounded-full text-white text-lg hover:ring-4 hover:ring-blue-400 transition-all duration-300 font-semibold"
                    onClick={randomChart}
                >
                    Random <BsRepeat />
                </button>
            </div>
        </div>
    );
}

export default Chart;
