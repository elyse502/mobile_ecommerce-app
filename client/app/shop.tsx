import { dummyProducts } from "@/assets/assets";
import Header from "@/components/Header";
import { Product } from "@/constants/types";
import { useEffect, useState } from "react";
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
    </SafeAreaView>
  );
}
