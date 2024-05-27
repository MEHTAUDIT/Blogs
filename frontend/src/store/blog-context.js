import { createContext } from "react";

const BlogContext = createContext(
    {
        isLoggedIn: '',
        setIsLoggedIn: () => {}
    }
);

export default BlogContext;

