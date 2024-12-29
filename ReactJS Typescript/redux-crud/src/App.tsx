// src/App.tsx

import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CreateItem from "./components/CreateItem/CreateItem";
import ListItems from "./components/ListItems/ListItems";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>CRUD Operations with Redux Toolkit</h1>
        <CreateItem />
        <ListItems />
      </div>
    </Provider>
  );
};

export default App;
