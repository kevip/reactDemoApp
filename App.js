import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, ToastAndroid } from 'react-native';
import ListItem from './src/ListItem/ListItem';
import {readFile, createFile, copyFile} from './src/services/fileSystemService';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'products.db', createFromLocation: '~products.db'});

const IMAGES = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png',
  '7.png',
  '8.png',
  '9.png',
  '10.png',  
];

export default class App extends React.Component {
  state = {    
    buttonGD: 'Generate data',
    buttonS: 'Show',
    buttonDelete: 'Drop products',
    products: [],
    storeTime: 0,
    loadTime: 0, 
    productsCount: 0,
  };

  constructor(props) {
    super(props);    
    this.getProductsCount();
  }
  
  deleteProducts = () => {
    db.transaction((tx) => {      
      tx.executeSql('DELETE FROM products', [], (tx, results) => {
        ToastAndroid.show(`All products have been removed`, ToastAndroid.SHORT);
        this.setState({ ...this.state, productsCount: 0});
      },(_) => { console.log(_);});
    });    
  }

  showList = () => {
    db.transaction((tx) => {
      let startTime = new Date();
      tx.executeSql('SELECT * FROM products ORDER BY id DESC', [], (tx, results) => {
        ToastAndroid.show(`There are ${results.rows.length} products`, ToastAndroid.SHORT);
        let len = results.rows.length;
        let products = []
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          products.push({id: row.id, name: row.name, price: row.price, imagePath: image_path});          
        }
        let endTime = new Date();
        loadTime = (endTime - startTime);
        this.setState({
          ...this.state,
          products,
          getProductsCount: products.length,
          loadTime,
        })
      }, (err)=> {
        ToastAndroid.show(`Something happend`, ToastAndroid.SHORT);
      });
    });
  }  
  getProductsCount = () => {    
    db.transaction((tx) => {      
      tx.executeSql('SELECT COUNT(*) as productsCount FROM products;', [], (tx, results) => {
        ToastAndroid.show(`There are ${results.rows.item(0).productsCount} products`, ToastAndroid.SHORT);
        this.setState({ ...this.state, productsCount: results.rows.item(0).productsCount});
      },(_) => {});
    });
  }
  generateItems = () => {
    let startTime = new Date();
    db.transaction(async(tx) => {
      for(let i=1; i<=10; i++) {
        let rand = Math.floor(Math.random() * 9999) + 1;
        const imagePath = `${Math.floor(Math.random() * 99999)}${(new Date()).getTime()}.png`;//concat random number + date
        await tx.executeSql('INSERT INTO products(name, price, image_path) VALUES(?, ?, ?)', [`product-${rand}`, rand, imagePath], (tx, results) => {
          console.log(results.insertId, imagePath);
          const index = Math.floor(Math.random()*9);
          copyFile(IMAGES[index], imagePath)
            .then(_=> {
              console.log("success");
              readFile(imagePath);
            })
            .catch(err=> {        
              console.log(err.message, err.code);
            });
          /*if(results.rowsAffected > 0) {
          }*/
        });
      }
    }, (error) => {
      let endTime = new Date();
      storeTime = (endTime - startTime);
      this.setState({ ...this.state, storeTime});
    }, () => {
      this.getProductsCount();
      let endTime = new Date();
      storeTime = (endTime - startTime);
      this.setState({ ...this.state, storeTime});
    });
  }

  renderList = () => {
    return (
      <FlatList 
        style={styles.flatList}
        data= {this.state.products}        
        renderItem= {({item}) => (          
          <ListItem name={item.name} price={item.price} path={item.imagePath}/>
        )}
        keyExtractor={item => `${item.id}`}
      />
    );
  }  

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style= {styles.title}>Products</Text>
          <Button
            style={styles.buttonRed}
            title={this.state.buttonDelete}
            onPress={this.deleteProducts}
          ></Button>
        </View>
        <View style={styles.row}>
          <Text style={styles.paragraph}>Numbers of products: {this.state.productsCount}</Text>          
        </View>
        <View style={styles.row}>          
          <Button
            style={styles.button}            
            title={this.state.buttonGD}
            onPress={this.generateItems}
          ></Button>
          <Text style={styles.paragraph}> Time[ms]: {this.state.storeTime}</Text>
        </View>
        <View style={styles.row}>          
          <Button
            style={styles.button}
            title={this.state.buttonS}
            onPress= {this.showList}
          ></Button>
          <Text style={styles.paragraph}> Time[ms]: {this.state.loadTime}</Text>
        </View>
        <View style={styles.listContainer}>
          {this.renderList()}
          {/*<ListItem products={this.state.products}/>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffff00',
    padding: 5,    
  },
  buttonRed: {
    backgroundColor: '#ff0000',
    padding: 5,    
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start',    
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  flatList: {
    width: '100%',
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  },
  paragraph: {
    marginRight: 20
  },
  productsGeneratorContainer: {

  },
  row: {
    /*flex: 1,*/
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    alignContent: 'flex-start',    
  },
  titleContainer: {    
    paddingTop: 20,
    paddingBottom: 20,    
  },
  title: {
    fontSize: 16,
  }

});
