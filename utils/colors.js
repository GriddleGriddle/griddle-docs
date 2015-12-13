import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';

import { config } from 'config'

const colors = colorPairsPicker(config.baseColor, {
  contrast: 5.5
});

const darker = chroma(config.baseColor).darken(10).hex();
const activeColors = colorPairsPicker(darker, {
  contrast: 7
});

//sloppy
colors.border = "#804AE3";
colors.secondaryBorder = "#512DA8"

colors.secondary = "#673AB7";
colors.tertiary = "#D1C4E9";
colors.white = "#EEE";

colors.darkerGrey = "#444";
colors.lightGrey = "#B6B6B6";

export default {
  colors: colors,
  activeColors: activeColors
}
