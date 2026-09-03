import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title="My Cart" showBack />

      {cartItems.length > 0 ? (
        <>
          <ScrollView
            className="flex-1, px-4 mt-4"
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item, index) => (
              <Text key={index}>{item.product.name}</Text>
            ))}
          </ScrollView>
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-secondary text-lg">Your cart is empty</Text>
          <TouchableOpacity onPress={() => router.push("/")} className="mt-4">
            <Text className="text-primary font-bold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
