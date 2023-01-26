import logo from './assets/logo.svg';
import './App.css';
import CreatePost from './CreatePost';

function App() {
  return (
    <div className="App">
      <header className="App-header">
            <img src={logo} alt="DALL-E" className="logo" />
        </header>
        <CreatePost />
    </div>
  );
}

export default App;
