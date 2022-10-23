import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./Pages/Shared/Header/Header";
import Footer from "./Pages/Shared/Footer/Footer";
import { Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Invalid from "./Pages/Invalid/Invalid";
import Login from "./Pages/Login/Login";
import { useState } from "react";

function App() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[usertype, setType] = useState("");

//login
/*     async function registerUser(e) {
      e.preventDefault();
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

    const data = await response.json();
    console.log(data);
  } */


  //signup
  async function registerUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usertype,
        username,
        email,
        password
      }),
    });

  const data = await response.json();
  console.log(data);
}

  return (
    //login
/*     <div className="App">
      <BrowserRouter>
        <div>
          <h1>Login</h1>
          <form onSubmit={registerUser}> 
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <input type="submit" value="Login" />
          </form>
        </div> */






        //signup
    <div className="App">
      <BrowserRouter>
        <div>
          <h1>SignUp</h1>
          <form onSubmit={registerUser}> 
            <input
              value={username}
              onChange={(e) => setName(e.target.value)}
              type="username"
              placeholder="username"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <input
              value={usertype}
              onChange={(e) => setType(e.target.value)}
              type="usertype"
              placeholder="usertype"
            />
            <input type="submit" value="SignUp" />
          </form>
        </div>

        





        {/* <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/Home">
            <Home></Home>
          </Route>
          <Route path="/Login">
          <Login></Login>
          </Route>
          <Route path="*">
            <Invalid></Invalid>
          </Route>
        </Switch>
        <Footer></Footer> */}
      </BrowserRouter>
    </div>




  );
}

export default App;
