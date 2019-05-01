import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import imageCard from '../assets/images/1.png';


const listItem = (props) => {console.log(props);return (    
    <View style={styles.listItem}>
        <Image source= {imageCard} style={styles.image}/>
        <Text style={styles.item}>{props.name} - $ {props.price}</Text>
        {/*props.products.map(product => (
        <Text key={product.id} style={styles.item}>{product.name} - $ {product.price}</Text>
        ))*/}
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