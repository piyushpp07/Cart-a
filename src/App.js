import React from 'react';
import Cart from './Cart'
import Navbar from './Navbar'
import firebase from 'firebase/app';
import 'firebase/firestore';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
    this.db = firebase.firestore();
  }
  componentDidMount() {
    this.db.collection('products').onSnapshot((snapshot) => {

      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      })
      this.setState({
        products, loading: false
      })
    })
  }
  addProduct = () => {
    this.db.collection("products")
      .add({
        img: "https://i.insider.com/604bd1bd10c8760018b9305d?width=1136&format=jpeg",
        price: 64000,
        quantity: 1,
        title: "I-pad"
      })
      .then(docRef => {
        docRef.get().then(snapshot => {
          console.log("Product has been added", snapshot.data());
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handelDeleteItem = (id) => {
    const { products } = this.state;
    const items = products.filter((item) => item.id !== id); ///[{}]
    const docRef = this.db.collection('products').doc(id);
    docRef.delete().then(() => { console.log("data deletes") })
  }
  handelIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef.update({ quantity: products[index].quantity + 1 }).then(() => { console.log("product Quantity Updated") }).catch((error) => { console.log(error) })
  }
  handelDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].quantity === 0)
      return;
    const docRef = this.db.collection('products').doc(products[index].id);
    docRef.update({ quantity: products[index].quantity - 1 }).then(() => { console.log("Quantity Decreased") });
  }
  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.quantity;
    })
    return count;

  }

  getCartTotal = () => {
    const { products } = this.state;
    let total = 0;
    products.map((product) => {
      total = total + product.quantity * product.price;
    })
    return total;
  }

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App" >
        <Navbar count={this.getCartCount()} />

        <Cart
          products={products}
          onIncreaseQuantity={this.handelIncreaseQuantity}
          onDecreaseQuantity={this.handelDecreaseQuantity}
          onDeleteProduct={this.handelDeleteItem} />
        <div style={{ padding: 10, fontSize: 20 }}>Total: {this.getCartTotal()}</div>
        {loading && <h1>Loading ....</h1>}

        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 12, backgroundColor: "#4267b2", borderRadius: 8 }}>
          Add I-Pad
        </button>
      </div >

    );
  }
}

export default App;
