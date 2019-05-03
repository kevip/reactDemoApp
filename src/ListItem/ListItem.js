import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const RNFS = require('react-native-fs');
const IMAGES_PATH = 'images';
const listItem = (props) => {        
    return (
    <View style={styles.listItem}>
        <Text>{`${props.id})`}</Text>
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