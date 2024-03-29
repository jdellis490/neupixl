import React, { useState } from "react";
import { ADD_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

// Destructure imageID and pass props to use in CommentForm function
const CommentForm = ({ imageId }) => {
  const [commentText, setCommentText] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        // From Comment typeDef and resolvers
        variables: {
          imageId,
          commentText,
          // User can't comment unless they have auth
          commentAuthor: Auth.getProfile().data.username,
        },
      });
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "commentText") {
      setCommentText(value);
    }
  };

  return (
    <div className="antialiased text-gray-900">
      <div className="max-w-xl mx-auto py-1">
        {Auth.loggedIn() ? (
          <form
            className="mt-8 px-5 py-5 pb-10 max-w-xl border border-neutral-800 rounded-xl bg-neutral-400"
            onSubmit={handleFormSubmit}
          >
            <textarea
              className="form-textarea mt-1 mb-5 block w-full h-24 rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
              name="commentText"
              value={commentText}
              placeholder="Add your comment..."
              onChange={handleChange}
            ></textarea>
            <button
              className="inline block text-md font-bold px-3 py-2 border rounded border-neutral-900 bg-neutral-200 hover:bg-lime-500 hover:border-white hover:text-white"
              type="submit"
            >
              Add Comment
            </button>
            {error && (
              <div className="text-red-500 italic bg-red-100 rounded p-2 mt-1">
                {error ? "Please enter a comment" : error.message}
              </div>
            )}
          </form>
        ) : (
          <div className="container mt-5 p-5 bg-gray-200 rounded-xl shadow border text-xl">
            <p>
              Please{" "}
              <Link className="text-lime-600 underline font-bold" to="/login">
                Login
              </Link>{" "}
              or{" "}
              <Link className="text-lime-600 underline font-bold" to="/signup">
                Signup
              </Link>{" "}
              to add your comments!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
