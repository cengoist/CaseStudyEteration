import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store';
import SearchBar from '../SearchBar/index';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/favoritesSlice';
import FilterModal from '../FilterModal';
import { RFPercentage } from "react-native-responsive-fontsize";

const noFavoritesImage = require('../../images/love.png');
const favoritesImage = require('../../images/fullLove.png');

const ProductList = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
    setDisplayedProducts(products.slice(0, ITEMS_PER_PAGE));
  }, [products]);

  const loadMoreProducts = () => {
    if (isLoading) return;
    setIsLoading(true);
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      const startIndex = nextPage * ITEMS_PER_PAGE;
      const moreProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      setDisplayedProducts(prevProducts => [...prevProducts, ...moreProducts]);
      setIsLoading(false);
      return nextPage;
    });
  };

  const handleSearch = (query: string) => {
    const filtered = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredProducts(filtered);
    setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  };

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  const handleFavoriteToggle = (product) => {
    if (isFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const applyFilter = (filter: string) => {
    let sortedProducts = [...products];
    switch (filter) {
      case 'price_asc':
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name_asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
    setDisplayedProducts(sortedProducts.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
      </TouchableOpacity>
      <Text style={styles.productPrice}>{item.price} ₺</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => dispatch(addToCart({ ...item, quantity: 1 }))}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => handleFavoriteToggle(item)}>
        <Image
          style={styles.favoriteIcon}
          source={isFavorite(item.id) ? favoritesImage : noFavoritesImage}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{paddingTop: 45}}>
        <Text style={styles.headerTitle}>E-Market</Text>
      </View>

      <SearchBar onSearch={handleSearch} />
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filters:</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
          <Text style={styles.filterButtonText}>Select Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayedProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading && <ActivityIndicator size="large" color="#007bff" />}
      />
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onApplyFilter={applyFilter}
      />
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: RFPercentage(4.5),
    marginLeft:'auto',
    marginRight: 'auto',
    color: '#333'
  },
  productList: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 15,
    padding: 5,
  },
  favoriteIcon: {
    width: 25,
    height: 25,
  },
});

export default ProductList;
