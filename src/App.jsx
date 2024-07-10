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
//the below array is edited in your favour ☠️☠️😂😂 earlier it was disrespecting
  const getRoast = (name, followers, repos) => {
    const roasts = [
        `${name}, with ${followers} followers, you're boldly exploring GitHub like a toddler with a new toy. Maybe expand your horizons beyond those ${repos} repositories.`,
        `Ah, ${name}, changing readme files and calling it open-source contribution with ${followers} followers? It's like decorating a cardboard castle. Let's aim higher.`,
        `${name}, let's address the elephant in the room: your profile name needs a makeover. Also, those ${repos} repositories seem to be longing for a touch of innovation.`,
        `Hey ${name}, before anything else, perhaps a profile name upgrade is in order. With ${followers} followers, it's time to unleash some real coding prowess into those repositories.`,
        `Hey ${name}, GitHub isn't just a follower-counting contest. With ${followers} followers and basic repos, let's elevate your presence from mere spectator to true innovator.`,
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
