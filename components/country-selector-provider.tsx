import { COUNTRIES } from "@/lib/countries";
import { Country } from "@/lib/types";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { List, Portal, Text, useTheme } from "react-native-paper";

interface CountrySelectorContextType {
  openCountrySelector: (
    selectedCountry: Country,
    onSelect: (country: Country) => void
  ) => void;
  closeCountrySelector: () => void;
}

const CountrySelectorContext = createContext<
  CountrySelectorContextType | undefined
>(undefined);

export const useCountrySelector = () => {
  const context = useContext(CountrySelectorContext);
  if (!context) {
    throw new Error(
      "useCountrySelector must be used within a CountrySelectorProvider"
    );
  }
  return context;
};

interface CountrySelectorProviderProps {
  children: React.ReactNode;
}

export const CountrySelectorProvider: React.FC<
  CountrySelectorProviderProps
> = ({ children }) => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [onSelectCallback, setOnSelectCallback] = useState<
    ((country: Country) => void) | null
  >(null);

  // Memoize the snap points
  const snapPoints = useMemo(() => ["60%", "80%"], []);

  const openCountrySelector = useCallback(
    (currentCountry: Country, onSelect: (country: Country) => void) => {
      setSelectedCountry(currentCountry);
      setOnSelectCallback(() => onSelect);
      bottomSheetRef.current?.snapToIndex(0);
    },
    []
  );

  const closeCountrySelector = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleCountrySelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      onSelectCallback?.(country);
      closeCountrySelector();
    },
    [onSelectCallback, closeCountrySelector]
  );

  // Memoize the country item renderer
  const renderCountryItem = useCallback(
    ({ item }: { item: Country }) => (
      <List.Item
        title={item.name}
        description={`+${item.dialCode}`}
        titleStyle={{ color: theme.colors.onSurface }}
        descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
        onPress={() => handleCountrySelect(item)}
        style={{
          backgroundColor:
            selectedCountry.code === item.code
              ? theme.colors.primaryContainer
              : "transparent",
          paddingLeft: 16,
        }}
        left={() => (
          <View
            style={[
              styles.listFlagContainer,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Text
              style={[styles.flag, { color: theme.colors.onSurfaceVariant }]}
            >
              {item.flag}
            </Text>
          </View>
        )}
        right={() =>
          selectedCountry.code === item.code ? (
            <List.Icon icon="check" color={theme.colors.primary} />
          ) : null
        }
      />
    ),
    [selectedCountry.code, theme.colors, handleCountrySelect]
  );

  const contextValue = useMemo(
    () => ({
      openCountrySelector,
      closeCountrySelector,
    }),
    [openCountrySelector, closeCountrySelector]
  );

  return (
    <CountrySelectorContext.Provider value={contextValue}>
      {children}
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={closeCountrySelector}
          enableDynamicSizing={false}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            />
          )}
          backgroundStyle={[
            { backgroundColor: theme.colors.elevation.level2 },
            styles.bottomSheetBackground,
          ]}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.onSurfaceVariant,
          }}
        >
          <BottomSheetView
            style={[
              styles.header,
              {
                borderBottomColor: theme.colors.outline,
                backgroundColor: theme.colors.elevation.level2,
              },
            ]}
          >
            <Text
              variant="headlineSmall"
              style={[styles.title, { color: theme.colors.onSurface }]}
            >
              Select Country
            </Text>
          </BottomSheetView>

          <BottomSheetFlatList
            data={COUNTRIES}
            keyExtractor={(item: Country) => item.code}
            renderItem={renderCountryItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            getItemLayout={(_, index) => ({
              length: 72,
              offset: 72 * index,
              index,
            })}
            windowSize={10}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={50}
            initialNumToRender={10}
            removeClippedSubviews={true}
            keyboardShouldPersistTaps="handled"
          />
        </BottomSheet>
      </Portal>
    </CountrySelectorContext.Provider>
  );
};

const styles = StyleSheet.create({
  listFlagContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  bottomSheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: "600",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    elevation: 0,
    borderRadius: 8,
  },
  listContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  flag: {
    fontSize: 18,
  },
});
