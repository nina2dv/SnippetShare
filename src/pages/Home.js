import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'


function Home(isAuth) {
    const [postList, setPostList]=useState([]);
    const postsCollectionRef = collection(db, "posts");
    const [search, setSearch] = useState("");

    const getReviews = async() => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  };

  const deletePost = async (id) => {
      const reviewDoc = doc(db, "posts", id);
      await deleteDoc(reviewDoc);
      getReviews();
  };    

  useEffect(() => {        
      getReviews();
  }, []);


    
    return (
    <div className="homePage">
            <input type="text" onChange={(e)=>{setSearch(e.target.value)}}/>

        {postList.filter((val)=>{
            if(search === ""){
                return val;
            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
                return val;
            }
        })
        .map((post)=>{
            return (
                <div className="post">
                    <div className="postHeader">
                        <div className="title">
                            <h1>{post.title}</h1>
                        </div>

                        <div className="deletePost"> 
                            {isAuth && post.author.id === auth.currentUser.uid && 
                            (<button onClick={()=>{deletePost(post.id)}}>❌</button>)
                            } 
                            
                        </div>

                    </div>
                    <div >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.postText}</ReactMarkdown>
                        <h3>@{post.author.name}</h3>
                    </div>
                </div>
            )
        })}
    </div>
    )
}
export default Home;
