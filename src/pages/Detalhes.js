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
            <View style={styles.container}>
                <Image style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${filme.backdrop_path}` }} />
                <Text className='text-xl text-white font-bold'>{filme.title}</Text>
                <Text className='text-xl text-white font-bold'>{filme.original_title}</Text>
                <Text className='text-white'>Sinopse: {filme.overview}</Text>
                <Text className='text-white'>Lançamento: {moment(new Date(`${filme.release_date}`)).format('DD-MM-YYYY')}</Text>
                <Text className= "text-white text-xl"> Nota: {Number(filme.vote_average).toFixed(1)}</Text>
                <View className="py-2"></View>
                <TouchableOpacity className="bg-lime-500 rounded" onPress={salvarFilmes}>
                    <Text className="text-center text-base w-20 h-7 font-bold">Salvar</Text>
                </TouchableOpacity>
                <View className="py-2"></View>
                <TouchableOpacity className="bg-lime-500 rounded" onPress={() => navigation.navigate('Favoritos')}>
                    <Text className="text-center text-base w-20 h-7 font-bold">Favoritos</Text>
                </TouchableOpacity>
                <View className="py-2"></View>
                <TouchableOpacity className="bg-lime-500 rounded" onPress={() => Linking.openURL(`https://m.youtube.com/results?search_query=${filme.title} Trailer`)}>
                    <Text className=" text-center text-base w-20 h-7 font-bold">Trailer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        //marginTop:5,
        alignItems: 'center',
        backgroundColor: '#1C1C1C'
    },
    image: {
        height: 200,
        width: '75%',
        resizeMode: 'stretch',
        borderRadius: 10
    },
})