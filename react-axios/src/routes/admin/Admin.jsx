import api from "../../axios/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Admin.css";

const Admin = () => {
  const [posts, setPosts] = useState([]);

  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    const filteredPosts = posts.filter((post) => post.id !== id);
    setPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      }
    };

    fetchPost();
  }, []);
  return (
    <div className="admin">
      <h1>Gerenciar Posts</h1>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((p) => (
          <div className="post" key={p.id}>
            <h2>{p.title}</h2>
            <div className="actions">
              <Link to={`/posts/edit/${p.id}`} className="btn edit-btn">
                Editar
              </Link>
              <button
                onClick={() => deletePost(p.id)}
                className="btn delete-btn"
              >
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
