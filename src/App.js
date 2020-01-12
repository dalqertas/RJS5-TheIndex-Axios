import React, { Component } from "react";
import axios from 'axios';

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  selectAuthor = async author => {    try{
    this.setState({loading:true})
    let response = await axios.get("https://the-index-api.herokuapp.com/api/authors/"+author.id);
      this.setState({currentAuthor: response.data, loading:false})
      
      } catch(error){
        console.error(error);
      }

  }

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return <AuthorsList authors={this.state.authors} selectAuthor={this.selectAuthor} />;
    }
  };
  async componentDidMount(){
    try{
    let response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
      this.setState({authors: response.data, loading:false})
      
      } catch(error){
        console.error(error);
      }

    }
  
  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.state.loading === true? 
          <p> Authors Loading...</p>:
           this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
