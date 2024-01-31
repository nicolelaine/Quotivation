import React from "react"
import { Heart } from "react-feather";

const QuoteCard = ({quote, addToFavorites, favoriteQuotes}) => {


  // Use the find method to check if the quote is already in favoriteQuotes
  const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === quote.id);

  // Use a ternary operator to set faveStyle based on whether it's a favorite or not
  const faveStyle = alreadyFavorite ? "#333" : "";


const handleAddFavorite = () => {
  addToFavorites(quote.id)
};

return (
  <article className="quote-card">
   <div>
       <p className="categories"></p>
       {quote.categories.map(category => (
         <span className="category" key={category}>
            {category}
         </span>
       ))}
       <h3>{quote.text}</h3>
   </div>
   <footer>
       <p className="author">{quote.author}</p>
       <p className="add-favorite" onClick={handleAddFavorite}>
       <Heart style={{ fill: faveStyle}}  />      
        </p>
   </footer>
  </article>
 );
};

export default QuoteCard;