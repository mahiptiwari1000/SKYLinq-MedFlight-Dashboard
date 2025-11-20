import { useNavigation } from "@react-navigation/native";

const SupportHelpCard = () => {
  const navigation = useNavigation<any>();

  return (
    // ...your card layout
    <Button
      mode="contained"
      onPress={() => navigation.navigate("SupportChat")}
    >
      Contact Support
    </Button>
  );
};
