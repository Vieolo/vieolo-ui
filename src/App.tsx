import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';

import Main from './view/main/main';

function App() {
  return <Router><Main /></Router>;
}

export default App;
