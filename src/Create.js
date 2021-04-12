import { useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const history = useHistory();

  const { data: blogs } = useFetch('http://localhost:8000/blogs');
  const authors = Array.from(new Set(blogs && blogs.map((v) => v.author)));
  authors.unshift("Select Author");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!isValid)
    {
      alert('Please provide valid inputs');
      return;
    }

    const blog = { title, body, author };

    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value.trim())}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value.trim())}
        ></textarea>
        <label>Blog author:</label>
        <select
          required={true}
          placeholder="Select"
          value={author}  
          onChange={(e) => {
            setAuthor(e.target.value );
            setIsValid(e.target.value === "Select Author" ? false : true);
          }
        }
        >
        {authors && authors.map(x => <option key={x} value={x}> {x} </option> )}

        </select>
        <button >Add Blog</button>
      </form>
    </div>
  );
}
 
export default Create;