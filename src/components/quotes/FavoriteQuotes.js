import React from "react";
import FavoriteQuoteCard from "./FavoriteQuoteCard";

const FavoriteQuotes = ({favoriteQuotes, maxFaves, removeFromFavorites}) => {
const remainingSpace = maxFaves - favoriteQuotes.length;

    return (
    <section className="favorite-quotes">
          <div className="wrapper quotes">
          <h3>Top 3 favorite quotes</h3>
        {favoriteQuotes.length > 0 && (
          <ul>
            {favoriteQuotes.map((quote, index) => (
              <FavoriteQuoteCard 
              key={quote.id} 
              quote={quote} 
              removeFromFavorites={removeFromFavorites}
              listPosition={index + 1}
              />
            ))}
          </ul>
                )}
              <div className="favorite-quotes-description">
                {remainingSpace > 0 && (
                  <p>
                  You can add {remainingSpace} {""}
                  {remainingSpace === 1 ? "more quote" : "more quotes"} to your favorites by selecting from the options below.
                  </p>
                )}
                {remainingSpace === 0 &&  (
                  <p></p>
                )}
              </div>
            
          </div>
        </section>
    );
};

export default FavoriteQuotes;