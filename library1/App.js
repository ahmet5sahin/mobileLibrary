
import { NavigationContainer } from '@react-navigation/native';
import RotNavigator from "./src/navigators/RootNavigation.jsx"
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigation from './src/navigation/RootNavigation.jsx';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.jsx';
const Stack = createStackNavigator();
export default function App() {
  return (

    // <NavigationContainer>
    //   <RotNavigator />

    // </NavigationContainer>

    <Provider store={store}>
      <RootNavigation />
    </Provider>


  );
}


