import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      setError('User Not Found');
    }
    setLoading(false);
  };

  const getRoast = (name, followers, repos) => {
    const roasts = [
      `${name}, behenchod kewal ${followers} followers le ke evverest chadne chala hai bsdk sharam karle saale  chuda rha hai kya aur repo dekh le apni kewal ${repos} repositories hai teri behenchod behenchod behenchod sasur duniya barbad ho jayegi tere jaise mc github par account bnayege to`,
      `abe oye bsd wale ${name}. sale tu vahi hai na to readme file change karke open source ka contributor banta hai . sale ${followers} followers lekar maiyaa chuda rha hai sharam kar le thuk ke dub ja usi me open source hai tere bap ka office nhi bhatt. behenchod skills seekh pahle fir idhar aana ma chudane`,
      `${name} saale ek bat bta nam to sahi rakh leta kam se kam profile ka vese bhi kam tera madarchodo wala hai aur pta chal rha hai youtube ke tutorial teep teep ke code likhta hai par nhi ye bhi galat bcoz tu behenchod ${repos} repo lekar maiya chuda rha hai`,
      `oye bsd wale ${name}, pahle to apna ye jhaantu sa profile name change kar aur sun saale followers to tere utne bhi nhi hai jitne tere scrotum me testes behenchod sharam karle madarchod thoda repo bnaya kar chudai center nhi hai ye chudne aa jata hai `,
      `oye bsdwale ${name}, github open source ke liye hota hai maa chudane ke liye nhi uske liye kahi aur jaa sale ${followers} followers hai tere aur repo ke nam par goo hai kewal aur sale tatti code likha hai sab tune gandagi hag di hai opensource ke nam par zero hai bsd wale `,
    ];
    return roasts[Math.floor(Math.random() * roasts.length)];
  };

  return (
    <div className="App">
      <h1>GitHub Profile Roaster</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={username} placeholder="Enter GitHub username" />
        <button type="submit" disabled={!username}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div className="user-profile">
          <img src={userData.avatar_url} alt="avatar" style={{ width: '100px' }} />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Repos: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <div className="roast-message">{getRoast(userData.name, userData.followers, userData.public_repos)}</div>
        </div>
      )}
    </div>
  );
}

export default App;
