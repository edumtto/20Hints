export const Color = {
  baseRed: '#e74c3c',
  baseBlue: '#3CA6ED',
  accentYellow: '#C7E83C',
  grey50: '#11181F',
  grey100: '#2c3e50',
  grey200: '#34495e',
  grey500: '#70748C',
  grey800: '#bdc3c7',
  grey900: '#ecf0f1'
}

type GradientColors = readonly [string, string, ...string[]];

export const Gradient: Record<string, GradientColors> = {
  greyBackground: ['#2c3e50', '#34495e', '#2c3e50']
}

