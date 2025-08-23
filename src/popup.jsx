import React, {useEffect, useState} from "react";
export default function Popup() {
    const [data, setData]=useState(null);
    useEffect(()=>{
        chrome.storage.local.get("AnalysisResult", res => {
            if(res.AnalysisResult){
                setData(res.AnalysisResult);
            }
            })
        }
    ,[]);

return (
<div className="w-80 p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
<h2 className="text-lg font-bold mb-2">Misinfo Checker</h2>


{!data && <p className="text-sm">No analysis yet. Highlight text on a page to check.</p>}


{data && (
<>
{/* Truth Score */}
<div className="mb-2">
<p className="text-sm font-semibold">Truth Score</p>
<p className="text-xl font-bold">{data.score}%</p>
</div>


{/* Verdict */}
<div className="mb-2">
<p className="text-sm font-semibold">Verdict</p>
<p className="italic">{data.verdict}</p>
</div>


{/* Carousel for Sources */}
<div className="mb-2">
<p className="text-sm font-semibold mb-1">Sources</p>
<div className="flex overflow-x-scroll space-x-2">
{data.sources && data.sources.map((src, i) => (
<a key={i} href={src.url} target="_blank" rel="noopener noreferrer"
className="flex-shrink-0 w-40 p-2 border rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200">
<p className="text-xs font-medium line-clamp-2">{src.title || src.url}</p>
</a>
))}
</div>
</div>


{/* Explanation */}
<div className="mb-2">
<p className="text-sm font-semibold mb-1">Explanation</p>
<p className="text-sm">{data.explanation}</p>
</div>
</>
)}
</div>
);
}