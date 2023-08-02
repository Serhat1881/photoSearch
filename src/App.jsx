import { useState } from 'react';
import './App.css';
import axios from 'axios';

// DİKKAT: Güvenlik için access key'i doğrudan kod içine yazmak önerilmez!
const accessKey = 'd07bZAJSJQZ7Rp1BFqlFGqpn6UGQ6zXrh2VjceZie6Q';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (term) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: term,
          },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className='container'>
      <h1>Ne Arıyorsunuz</h1>
      <input
        className='search-input'
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown} // "Enter" tuşu olayı
        placeholder="Aramak istediğiniz kelimeyi girin..."
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <img src={result.urls.small} alt={result.alt_description} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
