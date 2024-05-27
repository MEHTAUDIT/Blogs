import BlogContext from "./blog-context";
import {useState,useEffect} from "react";

const BlogProvider = ({children}) =>{

    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
          const response = await fetch("http://localhost:8000/check-session", {
            method: "GET",
            credentials: "include"
          });
    
          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
          console.log(isLoggedIn);
        };
    
        checkSession();
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