import { dummyAddress } from "@/assets/assets";
import Header from "@/components/Header";
import { COLORS } from "@/constants";
import { Address } from "@/constants/types";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <Header title="Checkout" showBack />

      <ScrollView className="flex-1 px-4 mt-4">
        {/* Address Section */}
        <Text className="text-lg font-bold text-primary mb-4">
          Shipping Address
        </Text>

        {selectedAddress ? (
          <View className="bg-white p-4 rounded-xl mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-base font-bold">
                {selectedAddress.type}
              </Text>

              <TouchableOpacity onPress={() => router.push("/addresses")}>
                <Text className="text-accent text-sm">Change</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-secondary leading-5">
              {selectedAddress.street}, {selectedAddress.city}
              {"\n"}
              {selectedAddress.state}, {selectedAddress.zipCode}
              {"\n"}
              {selectedAddress.country}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("/addresses")}
            className="bg-white p-6 rounded-xl mb-6 items-center justify-center border-dashed border-2 border-gray-100"
          >
            <Text className="text-primary font-bold">Add Address</Text>
          </TouchableOpacity>
        )}

        {/* Payment Method Section */}
        <Text className="text-lg font-bold text-primary mb-4">
          Payment Method
        </Text>

        {/* Cash on Delivery Option */}
        <TouchableOpacity
          onPress={() => setPaymentMethod("cash")}
          className={`bg-white p-4 rounded-xl mb-4 shadow-sm flex-row items-center border-2 ${paymentMethod === "cash" ? "border-primary" : "border-transparent"}`}
        >
          <Ionicons
            name="cash-outline"
            size={24}
            color={COLORS.primary}
            className="mr-3"
          />

          <View className="ml-3 flex-1">
            <Text className="text-base font-bold text-primary">
              Cash on Delivery
            </Text>
            <Text className="text-secondary text-xs mt-1">
              Pay when you receive the order
            </Text>
          </View>

          {paymentMethod === "cash" && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.primary}
            />
          )}
        </TouchableOpacity>

        {/* Stripe Option */}
        <TouchableOpacity
          onPress={() => setPaymentMethod("stripe")}
          className={`bg-white p-4 rounded-xl mb-4 shadow-sm flex-row items-center border-2 ${paymentMethod === "stripe" ? "border-primary" : "border-transparent"}`}
        >
          <Ionicons
            name="card-outline"
            size={24}
            color={COLORS.primary}
            className="mr-3"
          />

          <View className="ml-3 flex-1">
            <Text className="text-base font-bold text-primary">
              Pay with Card
            </Text>
            <Text className="text-secondary text-xs mt-1">
              Credit or Debit Card
            </Text>
          </View>

          {paymentMethod === "stripe" && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.primary}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
