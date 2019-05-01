import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, ToastAndroid } from 'react-native';
import ListItem from './src/ListItem/ListItem';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'products.db', createFromLocation: '~products.db'});

export default class App extends React.Component {
  state = {
    title: 'tilin',
    buttonGD: 'Generate data',
    buttonS: 'Show',
    products: [],
    storeTime: 0,
    loadTime: 0, 
    productsCount: 0,
  };

  constructor(props) {
    super(props);    
    this.getProductsCount();
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
          products.push({id: row.id, name: row.name, price: row.price});          
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
  renderList = () => {
    return (
      <FlatList 
        style={styles.flatList}
        data= {this.state.products}        
        renderItem= {({item}) => (          
          <ListItem name={item.name} price={item.price}/>
        )}
        keyExtractor={item => `${item.id}`}
      />
    );

  }
  getProductsCount = () => {    
    db.transaction((tx) => {
      //tx.executeSql('DELETE FROM productsCount;', [], (tx, results) => {});
      tx.executeSql('SELECT COUNT(*) as productsCount FROM products;', [], (tx, results) => {
        ToastAndroid.show(`There are ${results.rows.item(0).productsCount} products`, ToastAndroid.SHORT);
        this.setState({ ...this.state, productsCount: results.rows.item(0).productsCount});
      },(_) => {});
    });
  }
  generateItems = () => {
    let startTime = new Date();
    db.transaction(async(tx) => {
      for(let i=1; i<=1000; i++) {
        let rand = Math.floor(Math.random() * 9999) + 1
        await tx.executeSql('INSERT INTO products(name, price) VALUES(?, ?)', [`product-${rand}`, rand], (tx, results) => {
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


  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style= {styles.title}>Products</Text>
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
    /*height: 30,*/
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
