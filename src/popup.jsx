import React, {useEffect, useState} from "react";
export default function Popup() {
    const [data, setData]=useState(null);
    
    useEffect(()=>{
        chrome.storage.local.get("AnalysisResult", res => {
            console.log("Storage result:", res);
            if(res.AnalysisResult){
                console.log("Data loaded:", res.AnalysisResult);
                console.log("Sources array:", res.AnalysisResult.sources);
                setData(res.AnalysisResult);
            } else {
                console.log("No AnalysisResult found in storage");
            }
        })
    },[]);

    // Test function to manually add mock data
    const addTestData = () => {
        const testData = {
            score: 85,
            verdict: "Likely True",
            sources: [
                { title: "BBC News - Climate Change Report", url: "https://bbc.com/news/climate-report" },
                { title: "Reuters - Scientific Study Confirms", url: "https://reuters.com/science/study" },
                { title: "Nature Journal - Peer Review", url: "https://nature.com/articles/climate" }
            ],
            explanation: "This claim has been verified through multiple credible sources including peer-reviewed scientific journals and established news organizations. The evidence strongly supports the accuracy of this information."
        };
        console.log("Setting test data:", testData);
        chrome.storage.local.set({ AnalysisResult: testData }, () => {
            console.log("Test data stored successfully");
            setData(testData);
        });
    };

    return (
        <div className="w-80 p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-bold mb-4">Misinfo Checker</h2>

            {!data && (
                <div>
                    <p className="text-sm mb-2">No analysis yet. Highlight text on a page to check.</p>
                    <button 
                        onClick={addTestData}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                        Test Popup
                    </button>
                </div>
            )}

            {data && (
                <>
                    {/* Truth Score */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Truth Score</p>
                        <div className="flex items-center mt-1">
                            <div className="text-2xl font-bold mr-2">{data.score}%</div>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                    style={{width: `${data.score}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Verdict */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Verdict</p>
                        <p className="text-lg font-medium mt-1">{data.verdict}</p>
                    </div>

                    {/* Sources Carousel */}
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                            Sources {data.sources ? `(${data.sources.length})` : '(0)'}
                        </p>
                        {data.sources && data.sources.length > 0 ? (
                            <div className="flex overflow-x-auto space-x-3 pb-2">
                                {data.sources.map((src, i) => (
                                    <a 
                                        key={i} 
                                        href={src.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-shrink-0 min-w-48 w-48 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
                                    >
                                        <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                                            Source {i + 1}
                                        </div>
                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                            <div className="overflow-hidden" style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {src.title || src.url}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                                No sources available
                            </div>
                        )}
                    </div>

                    {/* Explanation */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Explanation</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                            {data.explanation || "No explanation available"}
                        </p>
                    </div>

                    <button 
                        onClick={() => {
                            chrome.storage.local.remove("AnalysisResult");
                            setData(null);
                        }}
                        className="w-full px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200"
                    >
                        Clear Data
                    </button>
                </>
            )}
        </div>
    );
}