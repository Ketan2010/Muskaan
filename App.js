import React, {Component} from 'react';
import Routes from './routes/Routes'
import Landing from './screens/Landing'
import { LogBox } from 'react-native';
import Donation from './screens/Donation';

LogBox.ignoreLogs(['Setting a timer']);


export default class App extends Component {
  constructor(props){
   super(props)
   this.state = {
    component : <Landing />
   }
  }
  
  componentDidMount(){
       // Start counting when the page is loaded
       this.timeoutHandle = setTimeout(()=>{
            this.setState({ component: <Routes /> })
       }, 3000);
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