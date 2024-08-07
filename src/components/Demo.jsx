import { useState } from "react";
import { copy, linkIcon, loader, tick, submitLogo } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
      console.log(newArticle);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <img src={submitLogo} alt="submit_logo" className="w-5 h-5" />
          </button>
        </form>

        {/* Browse URL History */}
      </div>

      {/* Display Results */}
      {isFetching && <p>Loading...</p>}
      {error && <p>Error fetching summary.</p>}
      {article.summary && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Summary:</h2>
          <p>{article.summary}</p>
        </div>
      )}
    </section>
  );
};

export default Demo;