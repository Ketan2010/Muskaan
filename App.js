import React, {Component} from 'react';
<<<<<<< HEAD
import Routes from './routes/Routes'
import Landing from './screens/Landing'
=======
import Navigation from './routes/Navigation'
import Loader from './screens/Loader'
>>>>>>> e81c6edc3cc16fce29685463cc5036f541631d87


export default class App extends Component {
  constructor(props){
   super(props)
   this.state = {
<<<<<<< HEAD
    component : <Landing />
=======
    component : <Loader />
>>>>>>> e81c6edc3cc16fce29685463cc5036f541631d87
   }
  }
  
  componentDidMount(){
       // Start counting when the page is loaded
       this.timeoutHandle = setTimeout(()=>{
<<<<<<< HEAD
            this.setState({ component: <Routes /> })
=======
            this.setState({ component: <Navigation /> })
>>>>>>> e81c6edc3cc16fce29685463cc5036f541631d87
       }, 1000);
  }
  
  componentWillUnmount(){
       clearTimeout(this.timeoutHandle); 
  }
  
  render() {
  return (
    this.state.component
  );
  }
}