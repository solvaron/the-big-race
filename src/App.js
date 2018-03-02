import React, { Component } from 'react';
import RunnerTable from './components/RunnerTable/RunnerTable';
import './App.css';
import 'primereact/resources/themes/kasper/theme.css';
import 'primereact/resources/primereact.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RunnerTable />
      </div>
    );
  }
}

export default App;
