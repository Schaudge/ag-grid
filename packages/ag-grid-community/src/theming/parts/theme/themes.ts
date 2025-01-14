import { createPart } from '../../Part';
import { createTheme } from '../../Theme';
import type { CoreParams } from '../../core/core-css';
import type { WithParamTypes } from '../../theme-types';
import {
    accentColor,
    accentMix,
    backgroundColor,
    foregroundBackgroundMix,
    foregroundColor,
    foregroundMix,
} from '../../theme-utils';
import type { ButtonStyleParams } from '../button-style/button-styles';
import { buttonStyleAlpine, buttonStyleBalham, buttonStyleBase } from '../button-style/button-styles';
import { checkboxStyleDefault } from '../checkbox-style/checkbox-styles';
import { colorSchemeVariable } from '../color-scheme/color-schemes';
import { columnDropStyleBordered, columnDropStylePlain } from '../column-drop-style/column-drop-styles';
import { iconSetBalham } from '../icon-set/balham/icon-set-balham';
import { iconSetAlpine, iconSetMaterial, iconSetQuartzRegular } from '../icon-set/icon-sets';
import type { InputStyleParams } from '../input-style/input-styles';
import { inputStyleBordered, inputStyleUnderlined } from '../input-style/input-styles';
import type { TabStyleParams } from '../tab-style/tab-styles';
import { tabStyleAlpine, tabStyleMaterial, tabStyleQuartz, tabStyleRolodex } from '../tab-style/tab-styles';
import { materialAdjustmentsCSS } from './material-adjustments.css-GENERATED';

const makeThemeQuartzTreeShakeable = () =>
    createTheme()
        .withPart(checkboxStyleDefault)
        .withPart(colorSchemeVariable)
        .withPart(iconSetQuartzRegular)
        .withPart(tabStyleQuartz)
        .withPart(inputStyleBordered)
        .withPart(columnDropStyleBordered)
        .withParams({
            fontFamily: [
                { googleFont: 'IBM Plex Sans' },
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'Oxygen-Sans',
                'Ubuntu',
            ],
        });

export const themeQuartz =
    /*#__PURE__*/
    makeThemeQuartzTreeShakeable();

const makeThemeAlpineTreeShakeable = () =>
    createTheme()
        .withPart(buttonStyleAlpine)
        .withPart(checkboxStyleDefault)
        .withPart(colorSchemeVariable)
        .withPart(iconSetAlpine)
        .withPart(tabStyleAlpine)
        .withPart(inputStyleBordered)
        .withPart(columnDropStyleBordered)
        .withParams({
            accentColor: '#2196f3',
            selectedRowBackgroundColor: accentMix(0.3),
            inputFocusBorder: {
                color: accentMix(0.4),
            },
            focusShadow: { radius: 2, spread: 1.6, color: accentMix(0.4) },
            iconButtonHoverBackgroundColor: 'transparent',
            iconButtonActiveBackgroundColor: 'transparent',
            checkboxUncheckedBorderColor: foregroundBackgroundMix(0.45),
            checkboxIndeterminateBackgroundColor: foregroundBackgroundMix(0.45),
            checkboxIndeterminateBorderColor: foregroundBackgroundMix(0.45),
            checkboxBorderWidth: 2,
            checkboxBorderRadius: 2,
            fontSize: 13,
            dataFontSize: 14,
            headerFontWeight: 700,
            borderRadius: 3,
            wrapperBorderRadius: 3,
            tabSelectedUnderlineColor: accentColor,
            tabSelectedBorderWidth: 0,
            tabSelectedUnderlineTransitionDuration: 0.3,
            sideButtonSelectedUnderlineColor: accentColor,
            sideButtonSelectedUnderlineWidth: 2,
            sideButtonSelectedUnderlineTransitionDuration: 0.3,
            sideButtonBorder: false,
            sideButtonSelectedBorder: false,
            sideButtonBarTopPadding: { calc: 'spacing * 3' },
            sideButtonSelectedBackgroundColor: 'transparent',
            sideButtonHoverTextColor: accentColor,
            iconButtonHoverColor: accentColor,
            toggleButtonWidth: 28,
            toggleButtonHeight: 18,
            toggleButtonSwitchInset: 1,
            toggleButtonOffBackgroundColor: foregroundBackgroundMix(0.45),
        });

export const themeAlpine =
    /*#__PURE__*/
    makeThemeAlpineTreeShakeable();

const makeThemeBalhamTreeShakeable = () =>
    createTheme()
        .withPart(buttonStyleBalham)
        .withPart(checkboxStyleDefault)
        .withPart(colorSchemeVariable)
        .withPart(iconSetBalham)
        .withPart(tabStyleRolodex)
        .withPart(inputStyleBordered)
        .withPart(columnDropStylePlain)
        .withParams({
            accentColor: '#0091ea',
            borderColor: foregroundMix(0.2),
            spacing: 4,
            widgetVerticalSpacing: { calc: 'max(8px, spacing)' },
            borderRadius: 2,
            wrapperBorderRadius: 2,
            headerColumnResizeHandleColor: 'transparent',
            headerColumnBorder: true,
            headerColumnBorderHeight: '50%',
            oddRowBackgroundColor: {
                ref: 'chromeBackgroundColor',
                mix: 0.5,
            },
            checkboxBorderRadius: 2,
            checkboxBorderWidth: 1,
            checkboxUncheckedBackgroundColor: backgroundColor,
            checkboxUncheckedBorderColor: foregroundBackgroundMix(0.5),
            checkboxCheckedBackgroundColor: backgroundColor,
            checkboxCheckedBorderColor: accentColor,
            checkboxCheckedShapeColor: accentColor,
            checkboxIndeterminateBackgroundColor: backgroundColor,
            checkboxIndeterminateBorderColor: foregroundBackgroundMix(0.5),
            checkboxIndeterminateShapeColor: foregroundBackgroundMix(0.5),
            focusShadow: { radius: 2, spread: 1, color: accentColor },
            headerTextColor: foregroundMix(0.6),
            iconButtonHoverBackgroundColor: 'transparent',
            iconButtonActiveBackgroundColor: 'transparent',
            fontSize: 12,
            tabSelectedBackgroundColor: backgroundColor,
            headerFontWeight: 'bold',
            toggleButtonWidth: 32,
            toggleButtonHeight: 16,
            toggleButtonSwitchInset: 1,
            toggleButtonOffBackgroundColor: foregroundBackgroundMix(0.5),
            sideButtonBorder: true,
            sideButtonBarTopPadding: { calc: 'spacing * 4' },
        });

export const themeBalham =
    /*#__PURE__*/
    makeThemeBalhamTreeShakeable();

type StyleMaterialParams = {
    primaryColor: 'infer';
};

const makeStyleMaterialTreeShakeable = () => {
    // define these overrides separately so that they don't affect the type of
    // this part - adding styleMaterial to a theme should override the value of
    // e.g. tabSelectedUnderlineColor, but not add that param to the type if
    // it's not there already
    const overrides: Partial<
        WithParamTypes<StyleMaterialParams & TabStyleParams & CoreParams & ButtonStyleParams & InputStyleParams>
    > = {
        tabSelectedUnderlineColor: { ref: 'primaryColor' },
        sideButtonSelectedUnderlineColor: { ref: 'primaryColor' },
        buttonTextColor: { ref: 'primaryColor' },
        rangeSelectionBackgroundColor: {
            ref: 'primaryColor',
            mix: 0.2,
        },
        rangeSelectionBorderColor: {
            ref: 'primaryColor',
        },
        rangeSelectionHighlightColor: {
            ref: 'primaryColor',
            mix: 0.5,
        },
        columnHoverColor: {
            ref: 'primaryColor',
            mix: 0.05,
        },
        selectedRowBackgroundColor: {
            ref: 'primaryColor',
            mix: 0.12,
        },
        inputFocusBorder: {
            width: 2,
            color: { ref: 'primaryColor' },
        },
        pickerButtonFocusBorder: {
            width: 1,
            color: { ref: 'primaryColor' },
        },
        cellEditingBorder: {
            color: { ref: 'primaryColor' },
        },
    };

    const lightColors = {
        primaryColor: '#3f51b5',
        foregroundColor: '#000D',
        headerTextColor: '#0008',
        accentColor: '#ff4081',
    } as const;

    const darkColors = {
        primaryColor: '#3f51b5',
        foregroundColor: '#fffD',
        headerTextColor: '#fff8',
        accentColor: '#bb86fc',
    } as const;

    return createPart<StyleMaterialParams>({
        feature: 'styleMaterial',
        css: materialAdjustmentsCSS,
        params: {
            ...lightColors,
            ...overrides,
        },
        modeParams: {
            light: lightColors,
            dark: darkColors,
            'dark-blue': darkColors,
        },
    });
};

export const styleMaterial = /*#__PURE__*/ makeStyleMaterialTreeShakeable();

const makeThemeMaterialTreeShakeable = () =>
    /*#__PURE__*/
    createTheme()
        .withPart(buttonStyleBase)
        .withPart(checkboxStyleDefault)
        .withPart(colorSchemeVariable)
        .withPart(iconSetMaterial)
        .withPart(tabStyleMaterial)
        .withPart(inputStyleUnderlined)
        .withPart(columnDropStylePlain)
        .withPart(styleMaterial)
        .withParams({
            rowHeight: {
                calc: 'max(iconSize, dataFontSize) + spacing * 3.75 * rowVerticalPaddingScale',
            },
            headerHeight: {
                calc: 'max(iconSize, dataFontSize) + spacing * 4.75 * headerVerticalPaddingScale',
            },
            widgetVerticalSpacing: {
                calc: 'spacing * 1.75',
            },
            cellHorizontalPadding: { calc: 'spacing * 3' },
            widgetContainerHorizontalPadding: { calc: 'spacing * 1.5' },
            widgetContainerVerticalPadding: { calc: 'spacing * 2' },
            fontSize: 13,
            iconSize: 18,
            borderRadius: 0,
            wrapperBorderRadius: 0,
            wrapperBorder: false,
            menuBorder: false,
            menuBackgroundColor: { ref: 'backgroundColor' },
            dialogBorder: false,
            panelTitleBarBorder: false,
            tabSelectedBorderWidth: 0,
            tabSelectedUnderlineTransitionDuration: 0.3,
            sidePanelBorder: false,
            sideButtonBarBackgroundColor: backgroundColor,
            sideButtonSelectedBorder: false,
            sideButtonSelectedUnderlineWidth: 2,
            sideButtonSelectedUnderlineTransitionDuration: 0.3,
            sideButtonBorder: false,
            sideButtonSelectedBackgroundColor: 'transparent',
            headerColumnResizeHandleColor: 'none',
            headerBackgroundColor: {
                ref: 'backgroundColor',
            },
            buttonBorder: false,
            buttonDisabledBorder: false,
            rowHoverColor: foregroundMix(0.08),
            focusShadow: {
                spread: 4,
                color: foregroundMix(0.16),
            },
            fontFamily: [
                { googleFont: 'Roboto' },
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Oxygen-Sans',
                'Ubuntu',
                'Cantarell',
                'Helvetica Neue',
                'sans-serif',
            ],
            inputHeight: {
                calc: 'max(iconSize, fontSize) + spacing * 3',
            },
            pickerButtonBorder: {
                width: 1,
                color: 'transparent',
            },
            headerFontWeight: 600,
            headerCellHoverBackgroundColor: foregroundMix(0.05),
            checkboxBorderWidth: 2,
            checkboxBorderRadius: 2,
            checkboxUncheckedBorderColor: foregroundColor,
            checkboxIndeterminateBackgroundColor: foregroundColor,
            toggleButtonWidth: 34,
            toggleButtonSwitchInset: 1,
            toggleButtonOffBackgroundColor: foregroundColor,
            cardShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            popupShadow: '0 10px 20px rgba(0,0,0,0.25), 0 7px 7px rgba(0,0,0,0.22)',
        });

export const themeMaterial = /*#__PURE__*/ makeThemeMaterialTreeShakeable();
