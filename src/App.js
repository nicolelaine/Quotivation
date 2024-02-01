import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import Quotes from "./components/quotes/Quotes";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Message from "./components/Message";
import "./App.css";

function App() {

    // State for storing quotes and loading status
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showMessage, setShowMessage] = useState(false);
 
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
      const alreadyFavorite = favoriteQuotes.some((quote) => quote.id === selectedQuote.id);

    
      if (favoriteQuotes.length < maxFaves) {
    
        if (alreadyFavorite) {
          setMessageText("This quote is already in your favorites! Choose another.")
          setShowMessage(true);
        } else {
          setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
          setMessageText("Added to favorites!");
          setShowMessage(true);
        }
      }  else {
          setMessageText("Max number of Favorite Quotes reached. Please delete one.");
          setShowMessage(true);
      }
    };

    const removeFromFavorites = (quoteID) => {
       const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteID)
       setFavoriteQuotes(updatedFavorites);
    };

    const removeMessage = () => {
         setShowMessage(false);
    };

    return (
    <div className='App'>
      {showMessage && <Message text={messageText}  removeMessage={removeMessage}/>}
      <Header />
      <main> 
        <FavoriteQuotes 
        favoriteQuotes={favoriteQuotes} 
        maxFaves={maxFaves} 
        removeFromFavorites={removeFromFavorites}/>
        {loading ? (
          <Loader/> 
        ) : (
        <Quotes 
        filteredQuotes={filteredQuotes} 
        categories={categories} category={category} 
        handleCategoryChange={handleCategoryChange} 
        addToFavorites={addToFavorites} 
        favoriteQuotes={favoriteQuotes}/>)}
        </main>
      <Footer />
    </div>
  );
}
export default App;
