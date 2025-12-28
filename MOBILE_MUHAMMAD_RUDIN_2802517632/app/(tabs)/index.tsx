import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Provider } from "react-redux";
import Cart from "./cart";
import { store } from "./redux/cartReduxStore";

import styles from "./styles/styles";
import prodcutDetailScreen from "./viewproducts";
const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default function StoreggApp() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  const filteredProducts = products.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const addToCart = (product: any) => {
  //   const existing = cart.find((item: any) => item.id === product.id);
  //   if (existing) {
  //     setCart(
  //       cart.map((item: any) =>
  //         item.id === product.id ? {...item, quantity: item.quantity + 1} : item
  //       )
  //     );
  //   } else {
  //     setCart([...cart, {...product, quantity: 1}]);
  //   }
  //   Alert.alert("Success", "Added to cart!");
  // };

  const addToMyProducts = (product: any) => {
    if (!myProducts.find((p: any) => p.id === product.id)) {
      setMyProducts([...myProducts, product]);
      Alert.alert("Success", "Product added to your store!");
    }
  };

  const removeFromMyProducts = (productId) => {
    setMyProducts(myProducts.filter((p) => p.id !== productId));
    Alert.alert("Success", "Product removed from your store!");
  };

  // Home Screen
  const HomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Storsegg</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => setViewMode("grid")}
            style={[
              styles.viewButton,
              viewMode === "grid" && styles.viewButtonActive,
            ]}>
            <Text style={styles.viewButtonText}>
              {viewMode === "grid" ? "⊞" : "⊡"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode("list")}
            style={[
              styles.viewButton,
              viewMode === "list" && styles.viewButtonActive,
            ]}>
            <Text style={styles.viewButtonText}>
              {viewMode === "list" ? "☰" : "☷"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
            <button style={{width: "30%", margin: "10px", padding: "8px", background: "black", color: "white", borderRadius: "8px"}} onClick={() => setCurrentScreen("cart")}>
              My Products
            </button>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {loading ? (
          <Text style={styles.loadingText}>Loading products...</Text>
        ) : (
          <View
            style={
              viewMode === "grid" ? styles.gridContainer : styles.listContainer
            }>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={viewMode === "grid" ? styles.gridItem : styles.listItem}
                onPress={() => {
                  setSelectedProduct(product);
                  setCurrentScreen("detail");
                }}>
                <Image
                  source={{uri: product.image}}
                  style={
                    viewMode === "grid" ? styles.gridImage : styles.listImage
                  }
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.productPrice}>${product.price}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );

  const ProductDetailScreen = () =>
    prodcutDetailScreen(selectedProduct, setCurrentScreen, styles);

  const CartScreen = () => Cart(setCurrentScreen);

  // Minigame 1: Number Guessing Game
  const NumberGuessingGame = () => {
    const [targetNumber, setTargetNumber] = useState(
      Math.floor(Math.random() * 100) + 1
    );
    const [guess, setGuess] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState("Guess a number between 1 and 100");
    const [gameWon, setGameWon] = useState(false);

    const handleGuess = () => {
      const numGuess = parseInt(guess);
      setAttempts(attempts + 1);

      if (numGuess === targetNumber) {
        setMessage(`🎉 Correct! You won in ${attempts + 1} attempts!`);
        setGameWon(true);
      } else if (numGuess < targetNumber) {
        setMessage("📉 Too low! Try again.");
      } else {
        setMessage("📈 Too high! Try again.");
      }
      setGuess("");
    };

    const resetGame = () => {
      setTargetNumber(Math.floor(Math.random() * 100) + 1);
      setGuess("");
      setAttempts(0);
      setMessage("Guess a number between 1 and 100");
      setGameWon(false);
    };

    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>🎯 Number Guessing Game</Text>
        <Text style={styles.gameMessage}>{message}</Text>
        <Text style={styles.gameAttempts}>Attempts: {attempts}</Text>

        {!gameWon ? (
          <>
            <TextInput
              style={styles.gameInput}
              keyboardType="numeric"
              value={guess}
              onChangeText={setGuess}
              placeholder="Enter your guess"
            />
            <TouchableOpacity style={styles.gameButton} onPress={handleGuess}>
              <Text style={styles.gameButtonText}>Submit Guess</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.gameButton} onPress={resetGame}>
            <Text style={styles.gameButtonText}>Play Again</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Minigame 2: Memory Cards Game
  const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
      initGame();
    }, []);

    const initGame = () => {
      const symbols = ["🎮", "🎯", "🎪", "🎨", "🎭", "🎬", "🎸", "🎹"];
      const gameCards = [...symbols, ...symbols]
        .sort(() => Math.random() - 0.5)
        .map((symbol, index) => ({id: index, symbol}));
      setCards(gameCards);
      setFlipped([]);
      setMatched([]);
      setMoves(0);
    };

    const handleCardClick = (card) => {
      if (
        flipped.length === 2 ||
        flipped.includes(card.id) ||
        matched.includes(card.symbol)
      ) {
        return;
      }

      const newFlipped = [...flipped, card.id];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves(moves + 1);
        const [first, second] = newFlipped;
        const firstCard = cards.find((c) => c.id === first);
        const secondCard = cards.find((c) => c.id === second);

        if (firstCard.symbol === secondCard.symbol) {
          setMatched([...matched, firstCard.symbol]);
          setFlipped([]);
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
    };

    const isGameWon = matched.length === cards.length / 2;

    return (
      <View style={styles.gameContainer}>
        <Text style={styles.gameTitle}>🧠 Memory Card Game</Text>
        <Text style={styles.gameAttempts}>Moves: {moves}</Text>

        {isGameWon && (
          <View style={styles.winMessage}>
            <Text style={styles.winText}>🏆 You Won!</Text>
          </View>
        )}

        <View style={styles.memoryGrid}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.memoryCard,
                (flipped.includes(card.id) || matched.includes(card.symbol)) &&
                  styles.memoryCardFlipped,
              ]}
              onPress={() => handleCardClick(card)}>
              <Text style={styles.memoryCardText}>
                {flipped.includes(card.id) || matched.includes(card.symbol)
                  ? card.symbol
                  : "?"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.gameButton} onPress={initGame}>
          <Text style={styles.gameButtonText}>New Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Games Screen
  const GamesScreen = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    if (selectedGame === 1) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedGame(null)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Minigames</Text>
          </View>
          <ScrollView style={styles.content}>
            <NumberGuessingGame />
          </ScrollView>
        </View>
      );
    }

    if (selectedGame === 2) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedGame(null)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Minigames</Text>
          </View>
          <ScrollView style={styles.content}>
            <MemoryGame />
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Minigames</Text>
        </View>
        <ScrollView style={styles.content}>
          <TouchableOpacity
            style={styles.gameCard}
            onPress={() => setSelectedGame(1)}>
            <Text style={styles.gameCardIcon}>🎯</Text>
            <Text style={styles.gameCardTitle}>Number Guessing</Text>
            <Text style={styles.gameCardDescription}>
              Guess the secret number!
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gameCard}
            onPress={() => setSelectedGame(2)}>
            <Text style={styles.gameCardIcon}>🧠</Text>
            <Text style={styles.gameCardTitle}>Memory Cards</Text>
            <Text style={styles.gameCardDescription}>Match all the pairs!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <Provider store={store}>
      <View style={styles.appContainer}>
        {currentScreen === "home" && <HomeScreen />}
        {currentScreen === "detail" && <ProductDetailScreen />}
        {currentScreen === "cart" && <CartScreen />}
        {currentScreen === "games" && <GamesScreen />}
      </View>
    </Provider>
  );
}

