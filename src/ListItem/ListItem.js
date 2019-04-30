import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


const listItem = (props) => (
    <View style={styles.listItem}>
        {props.products.map(product => (
        <Text key={product.id} style={styles.item}>{product.name} - $ {product.price}</Text>
        ))}
    </View>
);

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    item: {
        marginBottom: 5
    }

});

export default listItem;