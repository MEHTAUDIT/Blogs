import BlogContext from "./blog-context";
import {useState,useEffect} from "react";

const BlogProvider = ({children}) =>{

    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
          fetch("http://localhost:8000/check-session", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => response.json())
          .then(data => {
            setIsLoggedIn(data.isLoggedIn);
          });
        } 
      }, []);
    
    const blogContext = {
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <BlogContext.Provider value={blogContext}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;