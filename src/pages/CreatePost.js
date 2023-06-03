import React, { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'


function CreatePost({isAuth}) {
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const postsCollectionRef = collection(db, "posts");

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
          title,
          postText,
          author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
        navigate("/home");
      };

    useEffect(() => {
        if(!isAuth){
        navigate("/");
        }
    }, [])
    

    return (
    <main>
        <section className="markdown">
            <div>
            <h1>Create a Post</h1>
            <div>
                <label>Title: </label>
                <input className="inputSmall" placeholder="Title..." onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
            <div>
                <label>Post: </label>
                <textarea className="input" placeholder="Post..." onChange={(e) => {setPostText(e.target.value)}}/>
            </div>
            <button className="buttonPost" onClick={createPost}>Submit Post</button>
            </div>
            
            <article className="result">
                <h1>{title}</h1>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{postText}</ReactMarkdown>
            </article>
        </section>
    </main>
    )
}
export default CreatePost;