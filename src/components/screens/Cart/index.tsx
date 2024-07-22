import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { RFPercentage } from "react-native-responsive-fontsize";

const minusIcon = require('../../images/minus.png');
const plusIcon = require('../../images/plus.png');
const removeIcon = require('../../images/trash.png');

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price} ₺</Text>
      </View>
      <View style={styles.cartItemQuantity}>
        {item.quantity > 1 ? (
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
            <Image source={minusIcon} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleRemove(item.id)}>
            <Image source={removeIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {item.quantity > 1 && (
        <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
          <Image source={removeIcon} style={styles.iconT} />
        </TouchableOpacity>
      )}
    </View>
  );

  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
    <View style={styles.container}>
      <View style={{paddingTop: 45}}>
        <Text style={styles.headerTitle}>E-Market</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz sepetinizde ürün yok</Text>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {total.toFixed(2)} ₺</Text>
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.completeButtonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  cartList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  headerTitle: {
    fontSize: RFPercentage(4.5),
    marginLeft:'auto',
    marginRight: 'auto',
    color: '#333'
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 5,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemPrice: {
    color: '#888',
  },
  cartItemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  iconT: {
    width: 20,
    height: 20,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  completeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default Cart;
