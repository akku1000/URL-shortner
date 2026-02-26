import React, { use, useState } from 'react'
import useAuth from '../userstore/useAuth';

const Shorter = () => {
  const { shorten,urls,getall } = useAuth();
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleShorten = async (e) => {
    e.preventDefault();

    if (!url) return alert("Please enter a URL");

    setLoading(true);

    const res=await shorten(url)

      setShortUrl(res);
      setLoading(false);
  };

  const copyToClipboard = () => {
    console.log(shortUrl);
    navigator.clipboard.writeText(shortUrl);
  };
  const handleGetAll=async()=>{
      getall();
  }
  const copy=async(Short)=>{
    await navigator.clipboard.writeText(Short);
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          URL Shortener
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Paste your long URL below
        </p>

        <form onSubmit={handleShorten} className="space-y-4">
          <input
            type="url"
            placeholder="https://example.com/very-long-link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl flex items-center justify-between">
            <h3 className="text-gray-700 font-medium">New URL:</h3>
            <span className="text-indigo-600 font-medium">
              {shortUrl}
            </span>
            <button
              onClick={copyToClipboard}
              className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600 transition"
            >
              Copy
            </button>
          </div>
        )}

         <button
          onClick={handleGetAll}
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300"
        >
          Get All URLs
        </button>

        {urls&&(
          <div className="mt-6 max-h-60 overflow-y-auto space-y-2">
            {urls.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 rounded-lg text-sm"
              >
                <p><strong>Original:</strong> {item.longurl}</p>
                <p><strong>Short:</strong> http://localhost:5000/{item.shorturl}</p>
                <p><strong>clicks:</strong> {item.clicks}</p>
                 <button
               onClick={() => copy(`http://localhost:5000/${item.shorturl}`)}
              className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600 transition"
            >
              Copy
            </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Shorter