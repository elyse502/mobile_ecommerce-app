import { dummyAddress } from "@/assets/assets";
import { COLORS } from "@/constants";
import { Address } from "@/constants/types";
import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Checkout() {
  const { cartTotal } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "stripe">("cash");

  const shipping = 2.0;
  const tax = 0;
  const total = cartTotal + shipping + tax;

  const fetchAddress = async () => {
    const addrList = dummyAddress;

    if (addrList.length > 0) {
      // Find default or first address
      const def = addrList.find((a: any) => a.isDefault) || addrList[0];
      setSelectedAddress(def as Address);
    }

    setPageLoading(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please add a shipping address",
      });

      return;
    }

    if (paymentMethod === "stripe") {
      return Toast.show({
        type: "error",
        text1: "Info",
        text2: "Stripe not implemented yet",
      });
    }

    // Cash on Delivery
    router.replace("/orders");
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  if (pageLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Checkout</Text>
    </View>
  );
}
