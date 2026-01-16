import { useEffect, useState } from "react";
import api from "../../axios/config";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      }
    };

    fetchPost();
  }, []);

    const editPost = async (e) => {
        e.preventDefault();
        const post = { title, body, userId: 1 };

        await api.put(`/posts/${id}`, post);
        navigate("/admin");
    }
  return (
    <div className="new-post">
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            id="body"
            name="body"
            placeholder="Digite o conteúdo do post aqui..."
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          ></textarea>
        </div>
        <input type="submit" value={"Editar Post"} className="btn" />
      </form>
    </div>
  );
};

export default EditPost;
