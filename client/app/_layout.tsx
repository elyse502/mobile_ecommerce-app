import { Stack } from "expo-router";
import "@/global.css";
import { CartProvider } from "@/context/cartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Stack screenOptions={{ headerShown: false }} />;
      </WishlistProvider>
    </CartProvider>
  );
}
