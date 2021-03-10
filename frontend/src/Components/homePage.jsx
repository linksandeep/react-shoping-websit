import React from "react"
import Search from "./searchBar";
import "./Component.css";
import Header from "./landingPageHeader";

function Home(){

    return (
        <div>
            <Header/>
            <div className="homepage-search-bar">
                <Search />
            </div>
        </div>
    );
}

export default Home;

