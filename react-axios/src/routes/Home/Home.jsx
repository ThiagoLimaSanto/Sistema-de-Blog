import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import api from "../../axios/config";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      await getPosts();
    }
    fetchData();
  }, []);

  return (
    <div className="home">
      <h1>Últimos posts</h1>
      {posts.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        posts.map((p) => (
          <div className="post" key={p.id}>
            <h2>{p.title}</h2>
            <p>{p.body}</p>
            <Link to={`/posts/${p.id}`} className="btn">
              Ler Mais
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
