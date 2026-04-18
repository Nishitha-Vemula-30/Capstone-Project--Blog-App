import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAuth } from "../store/authStore";
import axios from "axios";
import { loadingClass, errorClass } from "../styles/common";
import { toast } from "react-hot-toast";

function ArticlePage() {
  const { id } = useParams();
  const currentUser = useAuth((state) => state.currentUser);

  const location = useLocation();
  const navigate = useNavigate();

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [comment, setComment] = useState("");

  // Fetch article
  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://capstone-project-blog-app-46tv.onrender.com/author-api/articles/${id}`,
          { withCredentials: true }
        );
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id, article]);

  // Add Comment
  const addComment = async () => {
    try {
      if (!comment.trim()) {
        toast.error("Comment cannot be empty");
        return;
      }

      const res = await axios.post(
        `https://capstone-project-blog-app-46tv.onrender.com/author-api/articles/${id}/comments`,
        {
          comment,
          userId: currentUser?._id,
        },
        { withCredentials: true }
      );

      // If backend returns updated article
      const updatedArticle = res.data.payload || {
        ...article,
        comments: [
          ...(article.comments || []),
          {
            comment,
            user: currentUser,
          },
        ],
      };

      setArticle(updatedArticle);
      setComment("");
      toast.success("Comment added");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add comment");
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return <p className={errorClass}>Article not found.</p>;

  const canEdit =
    currentUser &&
    article.author &&
    (article.author === currentUser._id ||
      article.author._id === currentUser._id);

  const toggleArticleActive = async (newStatus) => {
    try {
      await axios.patch(
        `https://capstone-project-blog-app-46tv.onrender.com/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true }
      );
      setArticle((prev) => ({ ...prev, isArticleActive: newStatus }));
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Top buttons */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← Back
        </button>

        {canEdit && (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(`/article/${id}/edit`, { state: article })
              }
              className="border px-3 py-1 rounded text-blue-700"
            >
              Edit
            </button>

            <button
              onClick={() =>
                toggleArticleActive(!article.isArticleActive)
              }
              className={`border px-3 py-1 rounded ${
                article.isArticleActive
                  ? "text-red-700"
                  : "text-green-700"
              }`}
            >
              {article.isArticleActive ? "Delete" : "Restore"}
            </button>
          </div>
        )}
      </div>

      {/* Article Content */}
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Category: {article.category}
      </p>
      <p className="leading-relaxed whitespace-pre-wrap">
        {article.content}
      </p>

      {/* Comment Input */}
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a Comment"
          className="border-2 rounded px-4 py-2 w-full"
        />
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded"
          onClick={addComment}
        >
          Add
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>

        {article.comments && article.comments.length > 0 ? (
          article.comments.map((cmt, index) => (
            <div
              key={index}
              className="border p-3 rounded mb-2 bg-gray-50"
            >
              <p className="text-sm text-gray-700">
                {cmt.user?.username || "User"}
              </p>
              <p>{cmt.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default ArticlePage;
