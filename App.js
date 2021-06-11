import React, {Component} from 'react';
import Navigation from './routes/Navigation'
import Loader from './screens/Loader'


export default class App extends Component {
  constructor(props){
   super(props)
   this.state = {
    component : <Loader />
   }
  }
  
  componentDidMount(){
       // Start counting when the page is loaded
       this.timeoutHandle = setTimeout(()=>{
            this.setState({ component: <Navigation /> })
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