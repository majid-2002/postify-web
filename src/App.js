import React from 'react'
import HeaderArea from './components/HeaderArea';
import RequestArea from './components/RequestArea';
import ResponseArea from './components/ResponseArea';
import History from './components/History';
import RequestInputArea from './components/RequestInputArea';



function App() {
  return (
    <div className="main">
      <HeaderArea />
      <RequestArea />
      <History />
      <RequestInputArea />
      <ResponseArea />
    </div>
  );
}

export default App;
