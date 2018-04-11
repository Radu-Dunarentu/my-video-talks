import React from 'react'
import DetailPage from "./DetailPage";
import ListPage from "./ListPage";
import CreatePage from "./CreatePage";

import { Route, Switch } from 'react-router-dom'
import Header from "./Header";

class App extends React.Component {

    render() {

        return(
            <div className="vt-app">
                <Header />
                <div>
                    <Switch>
                        <Route exact path="/" component={ListPage}></Route>
                        <Route path="/create" component={CreatePage}></Route>
                        <Route path="/post/:id" component={DetailPage}></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App