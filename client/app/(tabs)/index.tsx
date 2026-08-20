import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

export default function Home() {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header showMenu showCart showLogo />
    </SafeAreaView>
  );
}
