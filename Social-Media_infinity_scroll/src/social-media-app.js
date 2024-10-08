import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsFeedApp = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = "0fecbf6da0844d1aa322caba87a0ebf8"; // Replace with your News API key

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            language: "en",
            page: page,
            pageSize: 20, // 20 articles per page
            apiKey: API_KEY,
          },
        });

        setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
        if (response.data.articles.length === 0) setHasMore(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="news-feed-app">
      <h1>News Feed App</h1>
      {articles.map((article, index) => (
        <div key={index} className="article">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
      {loading && <p>Loading more articles...</p>}
      {!hasMore && <p>No more articles to show.</p>}
    </div>
  );
};

export default NewsFeedApp;
