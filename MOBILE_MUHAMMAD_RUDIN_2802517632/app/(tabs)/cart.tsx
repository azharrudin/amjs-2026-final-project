import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { } from "./redux/cartRedux";
import type { AppDispatch, RootState } from "./redux/cartReduxStore";
import viewMyProductStyles from "./styles/viewMyProductsStyles";
const Cart = function (setCurrentScreen: any) {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce(
    (sum: any, item: any) => sum + item.price * item.qty,
    0
  );
  return (
    <View style={viewMyProductStyles.container}>
      <View style={viewMyProductStyles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen("home")}>
          <Text style={viewMyProductStyles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={viewMyProductStyles.headerTitle}>My Products</Text>
      </View>
      
      <ScrollView style={viewMyProductStyles.content}>
        {/* Summary Card */}
        <View style={viewMyProductStyles.summaryCard}>
          <View style={viewMyProductStyles.summaryRow}>
            <Text style={viewMyProductStyles.summaryLabel}>Total Items:</Text>
            <Text style={viewMyProductStyles.summaryValue}>{cart.length}</Text>
          </View>
          <View style={viewMyProductStyles.summaryRow}>
            <Text style={viewMyProductStyles.summaryLabel}>Total Value:</Text>
            <Text style={viewMyProductStyles.summaryValue}> 🪙 {total.toFixed(2)}  coins</Text>
          </View>
        </View>

       <View style={viewMyProductStyles.productGrid}>
          {cart.map((product) => { 
            return (<TouchableOpacity
              key={product.id}
              style={viewMyProductStyles.productCard}
              onPress={() => {
        
              }}
            >
              <Image
                source={{ uri: product.image }}
                style={viewMyProductStyles.productImage}
                resizeMode="contain"
              />
              <View style={viewMyProductStyles.productInfo}>
                <Text style={viewMyProductStyles.productTitle} numberOfLines={1}>
                  {product.title}
                </Text>
                <Text style={viewMyProductStyles.productPrice}>🪙 {product.price}</Text>
                <View style={viewMyProductStyles.ownedBadge}>
                  <Text style={viewMyProductStyles.checkmark}>✓</Text>
                  <Text style={viewMyProductStyles.ownedText}>Owned</Text>
                </View>
              </View>
            </TouchableOpacity>);
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default Cart;
