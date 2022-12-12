import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Favoritos() {

    const navigation = useNavigation()

    const [filme, setFilme] = useState([])

    useEffect(() => {
        async function loadFilmes() {
            const minhaLista = await AsyncStorage.getItem('@favorito')
            setFilme(JSON.parse(minhaLista || []))
        }
        loadFilmes()
    }, [])

    function deleteItemFavorito(id) {
        let filtroFilmes = filme.filter((item) => {
            return (item.id != id)
        })
        setFilme(filtroFilmes)
        AsyncStorage.setItem('@favorito', JSON.stringify(filtroFilmes))
    }

   
    return (
        <SafeAreaView>
            <Text>Favoritos</Text>
            {filme.map(filmes => (
                <View key={filmes.id} style={styles.lixeira}>
                    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', `${filmes.id}`)}>
                        <Text>{filmes.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItemFavorito(`${filmes.id}`)} >
                        <Feather name='trash-2' color='#FF3F4B' size={25} />
                    </TouchableOpacity>
                </View>
            ))}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    lixeira: {
        flexDirection: 'row'
    }
})