import api from "../../axios/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await api.post("/posts", post);
    navigate("/");
  };
  return (
    <div className="new-post">
      <h2>Inserir novo Post:</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            id="body"
            name="body"
            placeholder="Digite o conteúdo do post aqui..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </div>
        <input type="submit" value={"Criar Post"} className="btn" />
      </form>
    </div>
  );
};

export default NewPost;
