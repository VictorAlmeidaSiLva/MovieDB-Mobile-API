import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../api/api'


export default function Dashboard() {

    const navigation = useNavigation()

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadFilmes() {

            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: 'e3557a63a0916ff565660d0e9b496cba',
                    language: 'pt-BR',
                }
            })

            setFilmes(response.data.results)
            setInterval(() => {
                setLoading(false)
            }, 3000)
        }
        loadFilmes()

    }, [])


    if (loading === true) {
        return (

            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.textCarregamento}>Aguarde Carregando</Text>
                    <ActivityIndicator size={150} color="#00ff00" marginTop={100} />

                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity className="bg-lime-500 rounded w-24 h-8" onPress={() => navigation.navigate('Favoritos')}>
                    <Text className="text-center text-lg font-bold">Favoritos</Text>
                </TouchableOpacity>
                {filmes.map(filme => (
                    <View className="flex-1 items-center justify-center" key={filme.id}>
                        <Text className="text-lg text-white font-bold">{filme.title}</Text>
                        <Image style={styles.image}
                            source={{ uri: `https://image.tmdb.org/t/p/original/${filme.poster_path}` }} />
                        <View className="py-1"></View>
                        <TouchableOpacity className="bg-lime-500 rounded" onPress={() => navigation.navigate('Detalhes', `${filme.id}`)}>
                            <Text className="text-base w-15 h-7 font-bold">Detalhes</Text>
                        </TouchableOpacity>
                        <View className="py-1"></View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop:5,
        alignItems: 'center',
        backgroundColor: '#1C1C1C'
    },
    image: {
        height: 200,
        width: '75%',
        resizeMode: 'stretch',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textCarregamento: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 40
    },

})