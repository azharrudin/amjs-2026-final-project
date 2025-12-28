import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/cartRedux";
import { AppDispatch, RootState } from "./redux/cartReduxStore";
import { subtractMoney } from "./redux/duitRedux";
const ProductDetailScreen = function (
  selectedProduct: any,
  setCurrentScreen: any,
  styles: any
) {

  const cart = useSelector((state: RootState) => state.duit.amount);
  if (!selectedProduct) return null;
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen("home")}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Detail</Text>
      </View>

      <ScrollView style={styles.content}>
        <Image
          source={{uri: selectedProduct.image}}
          style={styles.detailImage}
        />
        <View style={styles.detailContent}>
          <Text style={styles.detailCategory}>{selectedProduct.category}</Text>

          <Text style={styles.detailTitle}>{selectedProduct.title}</Text>
          <Text style={styles.detailDescription}>
            {selectedProduct.description}
          </Text>
          <Text style={styles.detailPrice}>${Math.round(selectedProduct.price)} Coins</Text>
          <View style={styles.balance}>
            <Text>Balance: 🪙 {cart}</Text>
          </View>
          <View style={styles.detailActions}>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                dispatch(
                    subtractMoney(Math.round(selectedProduct.price))
                )
                dispatch(
                  addToCart({
                    id: selectedProduct.id,
                    name: selectedProduct.title,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                    qty: 1,
                  })
                );
              }}>
              <Text style={styles.buyButtonText}>🛒 Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;
