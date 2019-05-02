export default showStructure = () => {
    db.transaction((tx) => {      
      tx.executeSql('pragma table_info(products)', [], (tx, results) => {        
        for(let i=0; i<results.rows.length; i++ ) {
          console.log(results.rows.item(i));
        }
        ToastAndroid.show(`All products have been removed`, ToastAndroid.SHORT);
        this.setState({ ...this.state, productsCount: 0});
      },(_) => { console.log(_);});
    });    
  }