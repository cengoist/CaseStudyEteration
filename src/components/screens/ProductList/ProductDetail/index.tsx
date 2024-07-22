import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addToCart } from '../../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../../redux/slices/favoritesSlice';

const ProductDetail = ({ route, navigation }) => {
  const { productId } = route.params;
  const product = useSelector((state: RootState) => state.products.items.find(item => item.id === productId));
  const dispatch = useDispatch();
  const noFavoritesImage = require('../../../images/love.png');
  const favoritesImage = require('../../../images/fullLove.png');
  const favorites = useSelector((state: RootState) => state.favorites.items);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found!</Text>
      </View>
    );
  }

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
        <Text style={styles.headerTitle}>{product.name}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.productImage} source={{ uri: product.image }} />
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
            <Image
              style={styles.favoriteIcon}
              source={isFavorite(product.id) ? favoritesImage : noFavoritesImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.productPrice}>{product.price} ₺</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => dispatch(addToCart({ ...product, quantity: 1 }))}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
    marginLeft: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007bff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#007bff',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'grey',
    borderRadius: 15,
    padding: 5,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#000',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductDetail;
