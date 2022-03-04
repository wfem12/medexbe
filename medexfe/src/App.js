import logo from './logo.svg';
import './App.css';
import {Title} from './Components/UX/Title';

function App() {
  return (
    <div>
      <Title>Hola Mundo Cruel</Title>
      <Title>Hola Mundo Cruel1</Title>
      <Title>Hola Mundo Cruel2</Title>
      <Title>Hola Mundo Cruel3</Title>
      <Title>
        Hola Mundo Cruel4
        <Title>Hola Mundo Cruel5</Title>
      </Title>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
