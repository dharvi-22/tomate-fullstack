//scrolls the page to top 
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        //scroll to the top whenever the path changes
        window.scrollTo(0,0);
    }, [pathname]);

    return null;
};

export default ScrollTop