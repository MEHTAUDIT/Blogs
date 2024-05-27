import BlogContext from "./blog-context";
import {useState} from "react";

const BlogProvider = ({children}) =>{

    const [isLoogedIn,setIsLoggedIn] = useState(false);

    const blogContext = {
        isLoogedIn,
        setIsLoggedIn
    }

    return (
        <BlogContext.Provider value={blogContext}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider;