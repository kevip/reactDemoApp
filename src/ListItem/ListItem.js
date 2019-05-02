import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import imageCard1 from '../assets/images/1.png';
import imageCard2 from '../assets/images/2.png';
import imageCard3 from '../assets/images/3.png';
import imageCard4 from '../assets/images/4.png';
import imageCard5 from '../assets/images/5.png';
import imageCard6 from '../assets/images/6.png';
import imageCard7 from '../assets/images/7.png';
import imageCard8 from '../assets/images/8.png';
import imageCard9 from '../assets/images/9.png';
import imageCard10 from '../assets/images/10.png';

const images = [
    imageCard1,
    imageCard2,
    imageCard3,
    imageCard4,
    imageCard5,
    imageCard6,
    imageCard7,
    imageCard8,
    imageCard9,
    imageCard10
]
const RNFS = require('react-native-fs');
const IMAGES_PATH = 'images';
const listItem = (props) => {
    const index = Math.floor(Math.random()*9);
    console.log(`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/${props.image}`);
    return (
    <View style={styles.listItem}>        
        <Image 
        source= {{uri: `file://${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/${props.image}`}}
        style={styles.image}/>
        <Text style={styles.item}>{props.name} - $ {props.price}</Text>        
    </View>
)};

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#d6d7da',        
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        marginBottom: 5
    },
    image: {
        width: 100,
        height: 100
    }
});

export default listItem;