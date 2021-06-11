import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'

const Screens = {
    
    Signup: {
        screen: Signup
    },
    Login: {
        screen: Login
    },
    Home: {
        screen: Home
    },
}

const HomeStact = createStackNavigator(Screens,{ headerMode: 'none'})

export default createAppContainer(HomeStact)
  