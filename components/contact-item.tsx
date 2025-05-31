import { Contact } from "@/lib/types";
import { router } from "expo-router";
import { CountryCode, formatIncompletePhoneNumber } from "libphonenumber-js";
import React from "react";
import { Avatar, List, useTheme } from "react-native-paper";
import { getAvatarColor } from "../lib/avatar-utils";

interface ContactItemProps {
  contact: Contact;
  index: number;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, index }) => {
  const theme = useTheme();
  const letter = contact.name.charAt(0).toUpperCase();
  const [avatarBackgroundColor, avatarTextColor] = getAvatarColor(
    letter,
    theme.dark,
    index
  );

  const handlePress = () => {
    router.push({
      pathname: "/edit-contact",
      params: { contact: JSON.stringify(contact), index: index },
    });
  };

  return (
    <List.Item
      title={contact.name}
      description={
        "+" +
        formatIncompletePhoneNumber(
          contact.phoneNumber,
          contact.countryCode as CountryCode
        )
      }
      titleStyle={{ fontSize: 18 }}
      descriptionStyle={{ color: theme.colors.outline }}
      style={{ paddingLeft: 40 }}
      onPress={handlePress}
      left={() => (
        <Avatar.Text
          size={45}
          label={letter}
          labelStyle={{ color: avatarTextColor, fontSize: 24 }}
          style={{ backgroundColor: avatarBackgroundColor }}
        />
      )}
    />
  );
};
