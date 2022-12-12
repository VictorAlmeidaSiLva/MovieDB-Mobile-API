import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaView,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native'
import api from '../api/api'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

export default function Detalhes(ident) {

    const navigation = useNavigation()

    const identifica = (ident.route.params)

    const [filme, setFilme] = useState([])

    useEffect(() => {

        async function loadFilme() {
            const response = await api.get(`/movie/${identifica}`, {
                params: {
                    api_key: 'e3557a63a0916ff565660d0e9b496cba',
                    language: 'pt-BR'
                }
            })
            setFilme(response.data)
        }
        loadFilme()
    }, [identifica])

    async function salvarFilmes() {

        const favoritos = await AsyncStorage.getItem('@favorito')
        let filmesSalvos = JSON.parse(favoritos) || []
        const storeFilme = filmesSalvos.some(((filmeSalvo) => filmeSalvo.id === filme.id))

        if (storeFilme) {
            alert('Filme já esta salvo!!')
            return
        }

        filmesSalvos.push(filme)
        AsyncStorage.setItem('@favorito', JSON.stringify(filmesSalvos))
        alert('Filme salvo!!')

        navigation.navigate('Favoritos')
    }

    return (
        <SafeAreaView>
            <View>
                <Image style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${filme.backdrop_path}` }} />
                <Text>Nome do Filme: {filme.title}</Text>
                <Text>Sinopse: {filme.overview}</Text>
                <Text>Lançamento: {moment(new Date(`${filme.release_date}`)).format('DD-MM-YYYY')}</Text>
                <TouchableOpacity onPress={salvarFilmes}>
                    <Text>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                    <Text>Favoritos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`https://m.youtube.com/results?search_query=${filme.title} Trailer`)}>
                    <Text>Trailer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop:5,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    image: {
        height: 200,
        width: '75%',
        resizeMode: 'stretch',
        borderRadius: 10
    },
})