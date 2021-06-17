import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item,navigation }) => {
    return (
        <View style={styles.cardView}>
            <TouchableOpacity onPress={()=>{navigation.navigate("recipe",{id:item.id})}}>
                <Image style={styles.image} source={{ uri: item.image }} />
            </TouchableOpacity>
            <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        margin: 10,
        left: 5,
    },
    image: {
        width: width - 20,
        height: height / 3,
        borderRadius: 10
    },
    itemTitle: {
        color: 'white',
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:5,
        padding:5,
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontWeight: "bold",
        elevation: 5
    },
    itemDescription: {
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem