import { CallerInfo } from "@/lib/types";
import { create } from "zustand";
import CallerIdModule from "../modules/caller-id";
import createSelectors from "./selectors";

type State = {
  contacts: CallerInfo[];
  isLoading: boolean;
  fetchContactError: string | null;
  addContactError: string | null;
  deleteContactError: string | null;
  updateContactError: string | null;
};

type Action = {
  fetchContacts: () => Promise<void>;
  addContact: (contact: CallerInfo) => Promise<boolean>;
  deleteContact: (phoneNumber: string) => Promise<boolean>;
  updateContact: (
    originalPhoneNumber: string,
    updatedContact: CallerInfo
  ) => Promise<boolean>;
  // Error clearing actions for better UX
  clearFetchError: () => void;
  clearAddError: () => void;
  clearDeleteError: () => void;
  clearUpdateError: () => void;
};

const initialState: State = {
  contacts: [],
  isLoading: false,
  fetchContactError: null,
  addContactError: null,
  deleteContactError: null,
  updateContactError: null,
};

const useContactStoreBase = create<State & Action>((set, get) => ({
  ...initialState,
  fetchContacts: async () => {
    set({ fetchContactError: null, isLoading: true });
    try {
      const contacts = await CallerIdModule.getAllCallerInfo();
      set({ contacts });
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      set({ fetchContactError: "Failed to load contacts" });
    } finally {
      set({ isLoading: false });
    }
  },

  addContact: async (contact) => {
    set({ addContactError: null }); // Clear previous errors
    try {
      const success = await CallerIdModule.storeCallerInfo(
        contact.phoneNumber,
        contact.countryCode,
        contact.name,
        contact.appointment || "",
        contact.city || "",
        contact.iosRow || ""
      );

      if (success) {
        // Refresh contacts list
        const updatedContacts = [...get().contacts, contact];
        updatedContacts.sort((a, b) => a.name.localeCompare(b.name));
        set({ contacts: updatedContacts });
      }

      return success;
    } catch (error) {
      set({ addContactError: "Failed to add contact" });
      console.error("Failed to add contact:", error);
      return false;
    }
  },
  deleteContact: async (phoneNumber) => {
    set({ deleteContactError: null }); // Clear previous errors
    try {
      const success = await CallerIdModule.removeCallerInfo(phoneNumber);

      if (success) {
        // Remove from local state
        const updatedContacts = get().contacts.filter(
          (contact) => contact.phoneNumber !== phoneNumber
        );
        set({ contacts: updatedContacts });
      }

      return success;
    } catch (error) {
      console.error("Failed to delete contact:", error);
      set({ deleteContactError: "Failed to delete contact" });
      return false;
    }
  },
  updateContact: async (originalPhoneNumber, updatedContact) => {
    set({ updateContactError: null }); // Clear previous errors
    try {
      // If phone number changed, we need to delete the old one first
      if (originalPhoneNumber !== updatedContact.phoneNumber) {
        const deleteSuccess = await CallerIdModule.removeCallerInfo(
          originalPhoneNumber
        );
        if (!deleteSuccess) {
          throw new Error("Failed to remove original contact");
        }
      }

      // Store the updated contact (this will now overwrite if phone number is the same due to REPLACE strategy)
      const success = await CallerIdModule.storeCallerInfo(
        updatedContact.phoneNumber,
        updatedContact.countryCode,
        updatedContact.name,
        updatedContact.appointment || "",
        updatedContact.city || "",
        updatedContact.iosRow || ""
      );

      if (success) {
        // Update local state
        const contacts = get().contacts;
        const updatedContacts = contacts.filter(
          (contact) => contact.phoneNumber !== originalPhoneNumber
        );
        updatedContacts.push(updatedContact);
        updatedContacts.sort((a, b) => a.name.localeCompare(b.name));
        set({ contacts: updatedContacts });
      }

      return success;
    } catch (error) {
      console.error("Failed to update contact:", error);
      set({ updateContactError: "Failed to update contact" });
      return false;
    }
  },

  // Error clearing actions for better UX
  clearFetchError: () => set({ fetchContactError: null }),
  clearAddError: () => set({ addContactError: null }),
  clearDeleteError: () => set({ deleteContactError: null }),
  clearUpdateError: () => set({ updateContactError: null }),
}));

const useContactStore = createSelectors(useContactStoreBase);

export default useContactStore;
