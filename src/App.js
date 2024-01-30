import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import Quotes from "./components/quotes/Quotes";
import "./App.css";

function App() {

    // State for storing quotes and loading status
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
 
     // URL for fetching quotes
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";

  
    const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];
    
    const maxFaves = 3;

     // Function to fetch quotes asynchronously
    const fetchQuotes = async () => {
      try {
        setLoading(true)
        const response = await fetch (quotesUrl);
        const results = await response.json();
        setQuotes(results)
      } catch (e) {
        console.log("There was an error, sorry", e)
      }
     setLoading(false)
    }

  
    useEffect (()=> {
      fetchQuotes();
    }, []);

    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    }

    const filteredQuotes =
    category !== "All" ? quotes.filter(quote => quote.categories.includes(category)) : quotes;


     const addToFavorites = (quoteID) => {
      const selectedQuote = quotes.find((quote) => quote.id === quoteID);
    
      if (favoriteQuotes.length < maxFaves) {
        const alreadyFavorite = favoriteQuotes.some((quote) => quote.id === selectedQuote.id);
    
        if (alreadyFavorite) {
          console.log("This quote is already in your favorites! Choose another.");
        } else {
          setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
          console.log("Added to favorites!");
        }
      } else {
        console.log("Max number of Favorite Quotes reached. Please delete one.");
      }
    };

    return (
    <div className='App'>
      <Header />
      <main> 
        <section className="favorite-quotes">
          <div className="wrapper quotes">
            <h3>
              Top 3 favorite quotes
              {favoriteQuotes.length > 0 && <p>
                {JSON.stringify(favoriteQuotes)}
                </p>}
              <div className="favorite-quotes-description">
                <p>You can select up to three quotes from the options below. 
                  <br/> Once you choose, they will appear here.
                </p>
              </div>
            </h3>
          </div>
        </section>
        {loading ? <Loader/> : <Quotes filteredQuotes={filteredQuotes} categories={categories} category={category} handleCategoryChange={handleCategoryChange} addToFavorites={addToFavorites}/>}</main>
      <Footer />
    </div>
  );
}
export default App;
