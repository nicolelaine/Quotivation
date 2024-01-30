import React from "react"
import { Heart } from "react-feather";

const QuoteCard = ({quote, addToFavorites}) => {

const handleAddFavorite = () => {
   addToFavorites(quote.id)
}

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
        <Heart />
       </p>
   </footer>
  </article>
 );
};

export default QuoteCard;