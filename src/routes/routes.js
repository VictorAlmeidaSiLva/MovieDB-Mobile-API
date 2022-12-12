import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../pages/DashBoard'
import Detalhes from '../pages/Detalhes'
import Favoritos from '../pages/Favoritos'

const Stack = createNativeStackNavigator()


function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name='Dashboard'
            component={Dashboard}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name='Detalhes'
            component={Detalhes}
            //options={{ headerShown: false }}
            />
            <Stack.Screen
            name='Favoritos'
            component={Favoritos}
            //options={{ headerShown: false }}
            />
        </Stack.Navigator>

    )
}

export default Routes