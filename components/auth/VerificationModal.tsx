import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { colors } from "@/theme";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
};

export function VerificationModal({ visible, email, onClose }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) return;
    setCode("");
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(focusTimer);
  }, [visible]);

  function handleChangeCode(text: string) {
    const digits = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    if (digits.length === CODE_LENGTH) {
      setTimeout(() => {
        onClose();
        router.replace("/");
      }, 200);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onShow={() => inputRef.current?.focus()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(5,8,13,0.72)" }}
        />

        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 28,
            padding: 24,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            shadowColor: "#000",
            shadowOpacity: 0.55,
            shadowRadius: 48,
            shadowOffset: { width: 0, height: 20 },
            elevation: 12,
          }}
        >
          <Pressable onPress={onClose} hitSlop={10} style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}>
            <Text style={{ color: colors.text3, fontSize: 22, lineHeight: 22 }}>×</Text>
          </Pressable>

          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
              backgroundColor: colors.blueWash,
              borderWidth: 1,
              borderColor: colors.blue,
            }}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.blue} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M4 6h16v12H4z" />
              <Path d="M4 7l8 6 8-6" />
            </Svg>
          </View>

          <Text className="font-display text-[22px] uppercase text-clutch-text-1">Check your email</Text>
          <Text className="mt-2 font-body text-[14px] leading-[20px] text-clutch-text-2">
            Enter the 6-digit code we sent to{" "}
            <Text className="font-body-semibold text-clutch-text-1">{email}</Text>
          </Text>

          <Pressable onPress={() => inputRef.current?.focus()} style={{ marginTop: 22 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {Array.from({ length: CODE_LENGTH }).map((_, i) => {
                const active = i === code.length;
                return (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      height: 52,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: active ? colors.blue : colors.border,
                      backgroundColor: colors.surfaceSunk,
                    }}
                  >
                    <Text className="font-mono-semibold text-[20px] text-clutch-text-1">{code[i] ?? ""}</Text>
                  </View>
                );
              })}
            </View>
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeCode}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0 }}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
