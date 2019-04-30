import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ListItem from './src/ListItem/ListItem';
import Faker from 'faker';

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
  };

  constructor(props) {
    super(props);    
  }

  showList = () => {
    db.transaction((tx) => {
      let startTime = new Date();
      tx.executeSql('SELECT * FROM products', [], (tx, results) => {
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
          loadTime,
        })
      });
    });
  }

  generateItems = () => {
    db.transaction(async(tx) => {
      /*let query = 'INSERT INTO products(name, price) ';
      let data = [];
      for(let i=1; i<=1000; i++) {
        query += i===1 ? 'VALUES(?,?)' : ',VALUES(?,?)';
        data.push();
      }*/
      let startTime = new Date();
      for(let i=1; i<=1000; i++) {
        let rand = Math.floor(Math.random() * 9999) + 1
        await tx.executeSql('INSERT INTO products(name, price) VALUES(?, ?)', [`product-${rand}`, rand], (tx, results) => {        
          if(results.rowsAffected > 0) {

          }       
        });
      }
      let endTime = new Date();
      storeTime = (endTime - startTime);
      this.setState({ ...this.state, storeTime});
    });
  }


  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style= {styles.title}>Productos</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.paragraph}>Numbers of products: {this.state.products.length}</Text>          
        </View>
        <View style={styles.row}>
          <Text style={styles.paragraph}>Products to generate</Text>
          <Button
            style={styles.button}            
            title={this.state.buttonGD}
            onPress={this.generateItems}
          ></Button>
          <Text style={styles.paragraph}> Time[ms]: {this.state.storeTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.paragraph}>Products to list</Text>
          <Button
            style={styles.button}
            title={this.state.buttonS}
            onPress= {this.showList}
          ></Button>
          <Text style={styles.paragraph}> Time[ms]: {this.state.loadTime}</Text>
        </View>
        <View style={styles.listContainer}>          
          <ListItem products={this.state.products}/>
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
