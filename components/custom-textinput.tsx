import * as React from "react";
import {
  Animated,
  ColorValue,
  I18nManager,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  Platform,
  StyleProp,
  StyleSheet,
  TextLayoutEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import TextInputAffix, {
  Props as TextInputAffixProps,
} from "../node_modules/react-native-paper/src/components/TextInput/Adornment/TextInputAffix";
import TextInputIcon, {
  Props as TextInputIconProps,
} from "../node_modules/react-native-paper/src/components/TextInput/Adornment/TextInputIcon";
import TextInputFlat from "../node_modules/react-native-paper/src/components/TextInput/TextInputFlat";
import type {
  ChildTextInputProps,
  RenderProps,
  TextInputLabelProp,
} from "../node_modules/react-native-paper/src/components/TextInput/types";
import { useInternalTheme } from "../node_modules/react-native-paper/src/core/theming";
import type { ThemeProp } from "../node_modules/react-native-paper/src/types";
import { forwardRef } from "../node_modules/react-native-paper/src/utils/forwardRef";
import { roundLayoutSize } from "../node_modules/react-native-paper/src/utils/roundLayoutSize";

import { Outline } from "../node_modules/react-native-paper/src/components/TextInput/Addons/Outline";
import {
  AdornmentSide,
  AdornmentType,
} from "../node_modules/react-native-paper/src/components/TextInput/Adornment/enums";
import TextInputAdornment, {
  getAdornmentConfig,
  getAdornmentStyleAdjustmentForNativeInput,
  TextInputAdornmentProps,
} from "../node_modules/react-native-paper/src/components/TextInput/Adornment/TextInputAdornment";
import {
  ADORNMENT_SIZE,
  LABEL_PADDING_TOP,
  LABEL_PADDING_TOP_DENSE,
  LABEL_WIGGLE_X_OFFSET,
  MAXIMIZED_LABEL_FONT_SIZE,
  MIN_DENSE_HEIGHT_OUTLINED,
  MINIMIZED_LABEL_FONT_SIZE,
  OUTLINE_MINIMIZED_LABEL_Y_OFFSET,
} from "../node_modules/react-native-paper/src/components/TextInput/constants";
import {
  adjustPaddingOut,
  calculateInputHeight,
  calculateLabelTopPosition,
  calculateOutlinedIconAndAffixTopPosition,
  calculatePadding,
  getConstants,
  getOutlinedInputColors,
  Padding,
} from "../node_modules/react-native-paper/src/components/TextInput/helpers";
import InputLabel from "../node_modules/react-native-paper/src/components/TextInput/Label/InputLabel";
import LabelBackground from "../node_modules/react-native-paper/src/components/TextInput/Label/LabelBackground";

const BLUR_ANIMATION_DURATION = 180;
const FOCUS_ANIMATION_DURATION = 150;

export type Props = React.ComponentPropsWithRef<typeof NativeTextInput> & {
  /**
   * Mode of the TextInput.
   * - `flat` - flat input with an underline.
   * - `outlined` - input with an outline.
   *
   * In `outlined` mode, the background color of the label is derived from `colors?.background` in theme or the `backgroundColor` style.
   * This component render TextInputOutlined or TextInputFlat based on that props
   */
  mode?: "flat" | "outlined";
  /**
   * The adornment placed on the left side of the input. It can be either `TextInput.Icon` or `TextInput.Affix`.
   */
  left?: React.ReactNode;
  /**
   * The adornment placed on the right side of the input. It can be either `TextInput.Icon` or `TextInput.Affix`.
   */
  right?: React.ReactNode;
  /**
   * If true, user won't be able to interact with the component.
   */
  disabled?: boolean;
  /**
   * The text or component to use for the floating label.
   */
  label?: TextInputLabelProp;
  /**
   * Placeholder for the input.
   */
  placeholder?: string;
  /**
   * Whether to style the TextInput with error style.
   */
  error?: boolean;
  /**
   * Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
   */
  onChangeText?: Function;
  /**
   * Selection color of the input. On iOS, it sets both the selection color and cursor color.
   * On Android, it sets only the selection color.
   */
  selectionColor?: string;
  /**
   * @platform Android only
   * Cursor (or "caret") color of the input on Android.
   * This property has no effect on iOS.
   */
  cursorColor?: string;
  /**
   * Inactive underline color of the input.
   */
  underlineColor?: string;
  /**
   * Active underline color of the input.
   */
  activeUnderlineColor?: string;
  /**
   * Inactive outline color of the input.
   */
  outlineColor?: string;
  /**
   * Active outline color of the input.
   */
  activeOutlineColor?: string;
  /**
   * Color of the text in the input.
   */
  textColor?: string;
  /**
   * Sets min height with densed layout. For `TextInput` in `flat` mode
   * height is `64dp` or in dense layout - `52dp` with label or `40dp` without label.
   * For `TextInput` in `outlined` mode
   * height is `56dp` or in dense layout - `40dp` regardless of label.
   * When you apply `height` prop in style the `dense` prop affects only `paddingVertical` inside `TextInput`
   */
  dense?: boolean;
  /**
   * Whether the input can have multiple lines.
   */
  multiline?: boolean;
  /**
   * @platform Android only
   * The number of lines to show in the input (Android only).
   */
  numberOfLines?: number;
  /**
   * Callback that is called when the text input is focused.
   */
  onFocus?: (args: any) => void;
  /**
   * Callback that is called when the text input is blurred.
   */
  onBlur?: (args: any) => void;
  /**
   *
   * Callback to render a custom input component such as `react-native-text-input-mask`
   * instead of the default `TextInput` component from `react-native`.
   *
   * Example:
   * ```js
   * <TextInput
   *   label="Phone number"
   *   render={props =>
   *     <TextInputMask
   *       {...props}
   *       mask="+[00] [000] [000] [000]"
   *     />
   *   }
   * />
   * ```
   */
  render?: (props: RenderProps) => React.ReactNode;
  /**
   * Value of the text input.
   */
  value?: string;
  /**
   * Pass `fontSize` prop to modify the font size inside `TextInput`.
   * Pass `height` prop to set `TextInput` height. When `height` is passed,
   * `dense` prop will affect only input's `paddingVertical`.
   * Pass `paddingHorizontal` to modify horizontal padding.
   * This can be used to get MD Guidelines v1 TextInput look.
   */
  style?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme?: ThemeProp;
  /**
   * testID to be used on tests.
   */
  testID?: string;
  /**
   * Pass custom style directly to the input itself.
   * Overrides input style
   * Example: `paddingLeft`, `backgroundColor`
   */
  contentStyle?: StyleProp<TextStyle>;
  /**
   * Pass style to override the default style of outlined wrapper.
   * Overrides style when mode is set to `outlined`
   * Example: `borderRadius`, `borderColor`
   */
  outlineStyle?: StyleProp<ViewStyle>;
  /**
   * Pass style to override the default style of underlined wrapper.
   * Overrides style when mode is set to `flat`
   * Example: `borderRadius`, `borderColor`
   */
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * Pass style to override the default style of the input container.
   * Overrides style of label offset
   */
  labelTranslationXOffset?: number;
};

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<TextInputHandles>
  > {
  Icon: React.FunctionComponent<TextInputIconProps>;
  Affix: React.FunctionComponent<Partial<TextInputAffixProps>>;
}

type TextInputHandles = Pick<
  NativeTextInput,
  "focus" | "clear" | "blur" | "isFocused" | "setNativeProps" | "setSelection"
>;

const DefaultRenderer = (props: RenderProps) => <NativeTextInput {...props} />;

/**
 * A component to allow users to input text.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { TextInput } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [text, setText] = React.useState("");
 *
 *   return (
 *     <TextInput
 *       label="Email"
 *       value={text}
 *       onChangeText={text => setText(text)}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 *
 * @extends TextInput props https://reactnative.dev/docs/textinput#props
 */
const TextInput = forwardRef<TextInputHandles, Props>(
  (
    {
      mode = "flat",
      dense = false,
      disabled = false,
      error: errorProp = false,
      multiline = false,
      editable = true,
      contentStyle,
      render = DefaultRenderer,
      theme: themeOverrides,
      ...rest
    }: Props,
    ref
  ) => {
    const theme = useInternalTheme(themeOverrides);
    const isControlled = rest.value !== undefined;
    const validInputValue = isControlled ? rest.value : rest.defaultValue;

    const { current: labeled } = React.useRef<Animated.Value>(
      new Animated.Value(validInputValue ? 0 : 1)
    );
    const { current: error } = React.useRef<Animated.Value>(
      new Animated.Value(errorProp ? 1 : 0)
    );
    const [focused, setFocused] = React.useState<boolean>(false);
    const [displayPlaceholder, setDisplayPlaceholder] =
      React.useState<boolean>(false);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string | undefined
    >(validInputValue);
    // Use value from props instead of local state when input is controlled
    const value = isControlled ? rest.value : uncontrolledValue;

    const [labelTextLayout, setLabelTextLayout] = React.useState({
      width: 33,
    });

    const [inputContainerLayout, setInputContainerLayout] = React.useState({
      width: 65,
    });

    const [labelLayout, setLabelLayout] = React.useState<{
      measured: boolean;
      width: number;
      height: number;
    }>({
      measured: false,
      width: 0,
      height: 0,
    });
    const [leftLayout, setLeftLayout] = React.useState<{
      height: number | null;
      width: number | null;
    }>({
      width: null,
      height: null,
    });
    const [rightLayout, setRightLayout] = React.useState<{
      height: number | null;
      width: number | null;
    }>({
      width: null,
      height: null,
    });

    const timer = React.useRef<NodeJS.Timeout | undefined>(undefined);
    const root = React.useRef<NativeTextInput | undefined | null>(null);

    const { scale } = theme.animation;

    React.useImperativeHandle(ref, () => ({
      focus: () => root.current?.focus(),
      clear: () => root.current?.clear(),
      setNativeProps: (args: Object) => root.current?.setNativeProps(args),
      isFocused: () => root.current?.isFocused() || false,
      blur: () => root.current?.blur(),
      forceFocus: () => root.current?.focus(),
      setSelection: (start: number, end: number) =>
        root.current?.setSelection(start, end),
    }));

    React.useEffect(() => {
      // When the input has an error, we wiggle the label and apply error styles
      if (errorProp) {
        // show error
        Animated.timing(error, {
          toValue: 1,
          duration: FOCUS_ANIMATION_DURATION * scale,
          // To prevent this - https://github.com/callstack/react-native-paper/issues/941
          useNativeDriver: true,
        }).start();
      } else {
        // hide error
        {
          Animated.timing(error, {
            toValue: 0,
            duration: BLUR_ANIMATION_DURATION * scale,
            // To prevent this - https://github.com/callstack/react-native-paper/issues/941
            useNativeDriver: true,
          }).start();
        }
      }
    }, [errorProp, scale, error]);

    React.useEffect(() => {
      // Show placeholder text only if the input is focused, or there's no label
      // We don't show placeholder if there's a label because the label acts as placeholder
      // When focused, the label moves up, so we can show a placeholder
      if (focused || !rest.label) {
        // If the user wants to use the contextMenu, when changing the placeholder, the contextMenu is closed
        // This is a workaround to mitigate this behavior in scenarios where the placeholder is not specified.
        if (rest.placeholder) {
          // Display placeholder in a delay to offset the label animation
          // If we show it immediately, they'll overlap and look ugly
          timer.current = setTimeout(
            () => setDisplayPlaceholder(true),
            50
          ) as unknown as NodeJS.Timeout;
        }
      } else {
        // hidePlaceholder
        setDisplayPlaceholder(false);
      }

      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, [focused, rest.label, rest.placeholder]);

    React.useEffect(() => {
      labeled.stopAnimation();
      // The label should be minimized if the text input is focused, or has text
      // In minimized mode, the label moves up and becomes small
      // workaround for animated regression for react native > 0.61
      // https://github.com/callstack/react-native-paper/pull/1440
      if (value || focused) {
        // minimize label
        Animated.timing(labeled, {
          toValue: 0,
          duration: BLUR_ANIMATION_DURATION * scale,
          // To prevent this - https://github.com/callstack/react-native-paper/issues/941
          useNativeDriver: true,
        }).start();
      } else {
        // restore label
        Animated.timing(labeled, {
          toValue: 1,
          duration: FOCUS_ANIMATION_DURATION * scale,
          // To prevent this - https://github.com/callstack/react-native-paper/issues/941
          useNativeDriver: true,
        }).start();
      }
    }, [focused, value, labeled, scale]);

    const onLeftAffixLayoutChange = React.useCallback(
      (event: LayoutChangeEvent) => {
        const height = roundLayoutSize(event.nativeEvent.layout.height);
        const width = roundLayoutSize(event.nativeEvent.layout.width);

        if (width !== leftLayout.width || height !== leftLayout.height) {
          setLeftLayout({
            width,
            height,
          });
        }
      },
      [leftLayout.height, leftLayout.width]
    );

    const onRightAffixLayoutChange = React.useCallback(
      (event: LayoutChangeEvent) => {
        const width = roundLayoutSize(event.nativeEvent.layout.width);
        const height = roundLayoutSize(event.nativeEvent.layout.height);

        if (width !== rightLayout.width || height !== rightLayout.height) {
          setRightLayout({
            width,
            height,
          });
        }
      },
      [rightLayout.height, rightLayout.width]
    );

    const handleFocus = (args: any) => {
      if (disabled || !editable) {
        return;
      }

      setFocused(true);

      rest.onFocus?.(args);
    };

    const handleBlur = (args: Object) => {
      if (!editable) {
        return;
      }

      setFocused(false);
      rest.onBlur?.(args);
    };

    const handleChangeText = (value: string) => {
      if (!editable || disabled) {
        return;
      }

      if (!isControlled) {
        // Keep track of value in local state when input is not controlled
        setUncontrolledValue(value);
      }
      rest.onChangeText?.(value);
    };

    const handleLayoutAnimatedText = React.useCallback(
      (e: LayoutChangeEvent) => {
        const width = roundLayoutSize(e.nativeEvent.layout.width);
        const height = roundLayoutSize(e.nativeEvent.layout.height);

        if (width !== labelLayout.width || height !== labelLayout.height) {
          setLabelLayout({
            width,
            height,
            measured: true,
          });
        }
      },
      [labelLayout.height, labelLayout.width]
    );

    const handleLabelTextLayout = React.useCallback(
      ({ nativeEvent }: NativeSyntheticEvent<TextLayoutEventData>) => {
        setLabelTextLayout({
          width: nativeEvent.lines.reduce(
            (acc, line) => acc + Math.ceil(line.width),
            0
          ),
        });
      },
      []
    );

    const handleInputContainerLayout = React.useCallback(
      ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
        setInputContainerLayout({
          width: layout.width,
        });
      },
      []
    );

    const forceFocus = React.useCallback(() => root.current?.focus(), []);

    const { maxFontSizeMultiplier = 1.5 } = rest;

    const scaledLabel = !!(value || focused);

    if (mode === "outlined") {
      return (
        <TextInputOutlined
          dense={dense}
          disabled={disabled}
          error={errorProp}
          multiline={multiline}
          editable={editable}
          render={render}
          {...rest}
          theme={theme}
          value={value}
          parentState={{
            labeled,
            error,
            focused,
            displayPlaceholder,
            value,
            labelTextLayout,
            labelLayout,
            leftLayout,
            rightLayout,
            inputContainerLayout,
          }}
          innerRef={(ref) => {
            root.current = ref;
          }}
          onFocus={handleFocus}
          forceFocus={forceFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onLayoutAnimatedText={handleLayoutAnimatedText}
          onInputLayout={handleInputContainerLayout}
          onLabelTextLayout={handleLabelTextLayout}
          onLeftAffixLayoutChange={onLeftAffixLayoutChange}
          onRightAffixLayoutChange={onRightAffixLayoutChange}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          contentStyle={contentStyle}
          scaledLabel={scaledLabel}
          _labelTranslationXOffset={rest.labelTranslationXOffset}
        />
      );
    }

    return (
      <TextInputFlat
        dense={dense}
        disabled={disabled}
        error={errorProp}
        multiline={multiline}
        editable={editable}
        render={render}
        {...rest}
        theme={theme}
        value={value}
        parentState={{
          labeled,
          error,
          focused,
          displayPlaceholder,
          value,
          labelTextLayout,
          labelLayout,
          leftLayout,
          rightLayout,
          inputContainerLayout,
        }}
        innerRef={(ref) => {
          root.current = ref;
        }}
        onFocus={handleFocus}
        forceFocus={forceFocus}
        onBlur={handleBlur}
        onInputLayout={handleInputContainerLayout}
        onChangeText={handleChangeText}
        onLayoutAnimatedText={handleLayoutAnimatedText}
        onLabelTextLayout={handleLabelTextLayout}
        onLeftAffixLayoutChange={onLeftAffixLayoutChange}
        onRightAffixLayoutChange={onRightAffixLayoutChange}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        contentStyle={contentStyle}
        scaledLabel={scaledLabel}
      />
    );
  }
) as CompoundedComponent;

const TextInputOutlined = ({
  disabled = false,
  editable = true,
  label,
  error = false,
  selectionColor: customSelectionColor,
  cursorColor,
  underlineColor: _underlineColor,
  outlineColor: customOutlineColor,
  activeOutlineColor,
  outlineStyle,
  textColor,
  dense,
  style,
  theme,
  render = (props: RenderProps) => <NativeTextInput {...props} />,
  multiline = false,
  parentState,
  innerRef,
  onFocus,
  forceFocus,
  onBlur,
  onChangeText,
  onLayoutAnimatedText,
  onLabelTextLayout,
  onLeftAffixLayoutChange,
  onRightAffixLayoutChange,
  onInputLayout,
  onLayout,
  left,
  right,
  placeholderTextColor,
  testID = "text-input-outlined",
  contentStyle,
  scaledLabel,
  ...rest
}: ChildTextInputProps & { _labelTranslationXOffset?: number }) => {
  const adornmentConfig = getAdornmentConfig({ left, right });

  const { colors, isV3, roundness } = theme;
  const font = isV3 ? theme.fonts.bodyLarge : theme.fonts.regular;
  const hasActiveOutline = parentState.focused || error;

  const { INPUT_PADDING_HORIZONTAL, MIN_HEIGHT, ADORNMENT_OFFSET, MIN_WIDTH } =
    getConstants(isV3);

  const {
    fontSize: fontSizeStyle,
    fontWeight,
    lineHeight: lineHeightStyle,
    height,
    backgroundColor = colors?.background,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;
  const lineHeight =
    lineHeightStyle || (Platform.OS === "web" ? fontSize * 1.2 : undefined);

  const {
    inputTextColor,
    activeColor,
    outlineColor,
    placeholderColor,
    errorColor,
    selectionColor,
  } = getOutlinedInputColors({
    activeOutlineColor,
    customOutlineColor,
    customSelectionColor,
    textColor,
    disabled,
    error,
    theme,
  });

  const densePaddingTop = label ? LABEL_PADDING_TOP_DENSE : 0;
  const paddingTop = label ? LABEL_PADDING_TOP : 0;
  const yOffset = label ? OUTLINE_MINIMIZED_LABEL_Y_OFFSET : 0;

  const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;

  const baseLabelTranslateX =
    (I18nManager.getConstants().isRTL ? 1 : -1) *
    (labelHalfWidth -
      (labelScale * labelWidth) / 2 -
      (fontSize - MINIMIZED_LABEL_FONT_SIZE) * labelScale);

  let labelTranslationXOffset = rest._labelTranslationXOffset || 0;
  const isAdornmentLeftIcon = adornmentConfig.some(
    ({ side, type }) =>
      side === AdornmentSide.Left && type === AdornmentType.Icon
  );
  const isAdornmentRightIcon = adornmentConfig.some(
    ({ side, type }) =>
      side === AdornmentSide.Right && type === AdornmentType.Icon
  );

  if (isAdornmentLeftIcon && labelTranslationXOffset === 0) {
    labelTranslationXOffset =
      (I18nManager.getConstants().isRTL ? -1 : 1) *
      (ADORNMENT_SIZE + ADORNMENT_OFFSET - (isV3 ? 0 : 8));
  }

  const minInputHeight =
    (dense ? MIN_DENSE_HEIGHT_OUTLINED : MIN_HEIGHT) - paddingTop;

  const inputHeight = calculateInputHeight(labelHeight, height, minInputHeight);

  const topPosition = calculateLabelTopPosition(
    labelHeight,
    inputHeight,
    paddingTop
  );

  if (height && typeof height !== "number") {
    // eslint-disable-next-line
    console.warn("Currently we support only numbers in height prop");
  }

  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: paddingTop,
    multiline: multiline ? multiline : null,
    dense: dense ? dense : null,
    topPosition,
    fontSize,
    lineHeight,
    label,
    scale: fontScale,
    isAndroid: Platform.OS === "android",
    styles: StyleSheet.flatten(
      dense ? styles.inputOutlinedDense : styles.inputOutlined
    ) as Padding,
  };

  const pad = calculatePadding(paddingSettings);

  const paddingOut = adjustPaddingOut({ ...paddingSettings, pad });

  const baseLabelTranslateY = -labelHalfHeight - (topPosition + yOffset);

  const { current: placeholderOpacityAnims } = React.useRef([
    new Animated.Value(0),
    new Animated.Value(1),
  ]);

  const placeholderOpacity = hasActiveOutline
    ? parentState.labeled
    : placeholderOpacityAnims[parentState.labelLayout.measured ? 1 : 0];

  const placeholderStyle = {
    position: "absolute",
    left: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  };

  const placeholderTextColorBasedOnState = parentState.displayPlaceholder
    ? placeholderTextColor ?? placeholderColor
    : "transparent";

  const labelBackgroundColor: ColorValue =
    backgroundColor === "transparent"
      ? theme.colors.background
      : backgroundColor;

  const labelProps = {
    label,
    onLayoutAnimatedText,
    onLabelTextLayout,
    placeholderOpacity,
    labelError: error,
    placeholderStyle,
    baseLabelTranslateY,
    baseLabelTranslateX,
    font,
    fontSize,
    lineHeight,
    fontWeight,
    labelScale,
    wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
    topPosition,
    hasActiveOutline,
    activeColor,
    placeholderColor,
    backgroundColor: labelBackgroundColor,
    errorColor,
    labelTranslationXOffset,
    roundness,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    testID,
    contentStyle,
    inputContainerLayout: {
      width:
        parentState.inputContainerLayout.width +
        (isAdornmentRightIcon || isAdornmentLeftIcon
          ? INPUT_PADDING_HORIZONTAL
          : 0),
    },
    opacity:
      parentState.value || parentState.focused
        ? parentState.labelLayout.measured
          ? 1
          : 0
        : 1,
    isV3,
  };

  const onLayoutChange = React.useCallback(
    (e: LayoutChangeEvent) => {
      onInputLayout(e);
      onLayout?.(e);
    },
    [onLayout, onInputLayout]
  );

  const minHeight = (height ||
    (dense ? MIN_DENSE_HEIGHT_OUTLINED : MIN_HEIGHT)) as number;

  const outlinedHeight =
    inputHeight + (dense ? densePaddingTop / 2 : paddingTop);
  const { leftLayout, rightLayout } = parentState;

  const leftAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: outlinedHeight,
    affixHeight: leftLayout.height || 0,
    labelYOffset: -yOffset,
  });

  const rightAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: outlinedHeight,
    affixHeight: rightLayout.height || 0,
    labelYOffset: -yOffset,
  });
  const iconTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: outlinedHeight,
    affixHeight: ADORNMENT_SIZE,
    labelYOffset: -yOffset,
  });

  const rightAffixWidth = right
    ? rightLayout.width || ADORNMENT_SIZE
    : ADORNMENT_SIZE;

  const leftAffixWidth = left
    ? leftLayout.width || ADORNMENT_SIZE
    : ADORNMENT_SIZE;

  const adornmentStyleAdjustmentForNativeInput =
    getAdornmentStyleAdjustmentForNativeInput({
      adornmentConfig,
      rightAffixWidth,
      leftAffixWidth,
      mode: "outlined",
      isV3,
    });
  const affixTopPosition = {
    [AdornmentSide.Left]: leftAffixTopPosition,
    [AdornmentSide.Right]: rightAffixTopPosition,
  };
  const onAffixChange = {
    [AdornmentSide.Left]: onLeftAffixLayoutChange,
    [AdornmentSide.Right]: onRightAffixLayoutChange,
  };

  let adornmentProps: TextInputAdornmentProps = {
    adornmentConfig,
    forceFocus,
    topPosition: {
      [AdornmentType.Icon]: iconTopPosition,
      [AdornmentType.Affix]: affixTopPosition,
    },
    onAffixChange,
    isTextInputFocused: parentState.focused,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    disabled,
  };
  if (adornmentConfig.length) {
    adornmentProps = {
      ...adornmentProps,
      left,
      right,
      textStyle: { ...font, fontSize, lineHeight, fontWeight },
      visible: parentState.labeled,
    };
  }

  return (
    <View style={viewStyle}>
      {/*
            Render the outline separately from the container
            This is so that the label can overlap the outline
            Otherwise the border will cut off the label on Android
            */}
      <Outline
        isV3={isV3}
        style={outlineStyle}
        label={label}
        roundness={roundness}
        hasActiveOutline={hasActiveOutline}
        focused={parentState.focused}
        activeColor={activeColor}
        outlineColor={outlineColor}
        backgroundColor={backgroundColor}
      />
      <View
        style={[
          styles.labelContainer,
          {
            paddingTop,
            minHeight,
          },
        ]}
      >
        {label ? (
          <InputLabel
            labeled={parentState.labeled}
            error={parentState.error}
            focused={parentState.focused}
            scaledLabel={scaledLabel}
            wiggle={Boolean(parentState.value && labelProps.labelError)}
            labelLayoutMeasured={parentState.labelLayout.measured}
            labelLayoutWidth={parentState.labelLayout.width}
            labelLayoutHeight={parentState.labelLayout.height}
            {...labelProps}
            labelBackground={LabelBackground}
            maxFontSizeMultiplier={rest.maxFontSizeMultiplier}
          />
        ) : null}
        {render?.({
          ...rest,
          ref: innerRef,
          onLayout: onLayoutChange,
          onChangeText,
          placeholder: rest.placeholder,
          editable: !disabled && editable,
          selectionColor,
          cursorColor:
            typeof cursorColor === "undefined" ? activeColor : cursorColor,
          placeholderTextColor: placeholderTextColorBasedOnState,
          onFocus,
          onBlur,
          underlineColorAndroid: "transparent",
          multiline,
          style: [
            styles.input,
            !multiline || (multiline && height) ? { height: inputHeight } : {},
            paddingOut,
            {
              ...font,
              fontSize,
              lineHeight,
              fontWeight,
              color: inputTextColor,
              textAlignVertical: multiline ? "top" : "center",
              textAlign: textAlign
                ? textAlign
                : I18nManager.getConstants().isRTL
                ? "right"
                : "left",
              paddingHorizontal: INPUT_PADDING_HORIZONTAL,
              minWidth: Math.min(
                parentState.labelTextLayout.width +
                  2 * INPUT_PADDING_HORIZONTAL,
                MIN_WIDTH
              ),
            },
            Platform.OS === "web" ? { outline: "none" } : undefined,
            adornmentStyleAdjustmentForNativeInput,
            contentStyle,
          ],
          testID,
        } as RenderProps)}
      </View>
      <TextInputAdornment {...adornmentProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    paddingBottom: 0,
    flexGrow: 1,
  },
  input: {
    margin: 0,
    flexGrow: 1,
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputOutlinedDense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
});

// @component ./Adornment/TextInputIcon.tsx
TextInput.Icon = TextInputIcon;

// @component ./Adornment/TextInputAffix.tsx
// @ts-ignore Types of property 'theme' are incompatible.
TextInput.Affix = TextInputAffix;

export default TextInput;
