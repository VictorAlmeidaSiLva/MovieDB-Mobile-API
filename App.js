import { StatusBar, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './src/routes/routes'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#000000' barStyle='light-content' translucent={false} />
        <Routes />
    </NavigationContainer>
  );
}