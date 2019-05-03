import React from 'react';
import './css/App.scss';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

// Pages
import Home from './components/pages/Home'
import Draw from './components/pages/Draw'
import Browse from './components/pages/Browse'
import Emoji from './components/pages/Emoji'
import Account from './components/pages/Account'

function App() {
  return (
    <>
        <Grid container={true} alignItems="center" justify="center">
        <Router>
          <header>
            <Navbar />
          </header>
          <main>
            <Route exact path="/" component={Draw} />
            <Route path="/draw" component={Draw} />
            <Route path="/browse" component={Browse} />
            <Route path="/emoji" component={Emoji} />
            <Route path="/account" component={Account} />
          </main>
        </Router>
        </Grid>
    </>
  );
}

export default App;
