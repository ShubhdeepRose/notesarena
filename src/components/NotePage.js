import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const NotePage = ({ note, handleDelete }) => {
    const { id } = useParams();
    const post = note.find((note) => (note.id).toString() === id);

    return (
        <div>
            {post && <div className="full-notes">
                <div className="title">
                    <h2>{post.title}</h2>
                </div>
                <div className="description">
                    <p>{post.description}</p>
                </div>
                <div className="button">
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                    <Link to={`/edit/${post.id}`}><button>Update</button></Link>
                </div>
            </div>}


            {!post &&
                <div className="not-found">
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </div>
            }
        </div>
    );
};

export default NotePage;

