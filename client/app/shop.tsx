import { dummyProducts } from "@/assets/assets";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNumber = 1) => {
    if (pageNumber == 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const start = (pageNumber - 1) * 10;
      const end = start + 10;
      const paginatedData = dummyProducts.slice(start, end);

      if (pageNumber === 1) {
        setProducts(paginatedData);
      } else {
        setProducts((prev) => [...prev, ...paginatedData]);
      }

      setHasMore(end < dummyProducts.length);
      setPage(pageNumber);
    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && !loading && hasMore) {
      fetchProducts(page + 1);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title="Shop" showBack showCart />

      <View className="flex-row gap-2 mb-3 mx-4 my-2">
        {/* search bar */}
        <View className="flex-1 flex-row items-center bg-white rounded-xl border border-gray-100">
          <Ionicons
            name="search"
            className="ml-4"
            size={20}
            color={COLORS.secondary}
          />
          <TextInput
            className="flex-1 ml-2 text-primary px-4 py-3"
            placeholder="Search products..."
            returnKeyType="search"
            placeholderTextColor={COLORS.secondary}
          />
        </View>

        {/* filter icon */}
        <TouchableOpacity className="bg-gray-800 w-12 h-12 items-center justify-center rounded-xl">
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </SafeAreaView>
  );
}
