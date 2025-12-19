// Colores del tema - sincronizados con _variables.scss
export const COLORS = {
  // Verdes principales
  schoolGreen: '#1FB57B',
  schoolGreenPrimary: '#2e8b57',
  schoolGreenHover: '#237a47',
  schoolGreenLight: '#DFF7EC',
  schoolGreenExtraLight: '#f9fafb',
  
  // Azules
  schoolBlue: '#1A237E',
  
  // Grises
  gray: '#888',
  mediumLightGray: '#777',
  mediumDarkGray: '#666',
  mediumGrayAlt: '#555',
  mediumDarkGrayAlt: '#444',
  darkMediumGray: '#333',
  lightMediumDarkGray: '#ddd',
  lightGray: '#e0e0e0',
  darkGray: '#4c4c4c',
  mediumGray: '#707070',
  
  // Básicos
  black: '#000',
  white: '#fff',
  whiteSmoke: '#fcfcfc',
  
  // Bordes y sombras para chat
  borderGray: '#e5e7eb',
  borderLightGray: '#d1d5db',
  shadowGray: '#f3f4f6',
  textGray: '#1f2937',
  textLightGray: '#374151',
  disabledGray: '#9ca3af',
  
  // Scrollbar
  scrollbarTrackGray: '#f1f1f1',
  scrollbarThumbGray: '#c1c1c1',
  scrollbarThumbHoverGray: '#a1a1a1',
  
  // Error states
  errorBackground: '#fee2e2',
  errorBorder: '#fecaca',
  errorText: '#991b1b',
  
  // Course category badges
  categoryInicial: '#10b981', // verde
  categoryAvanzado: '#3b82f6', // azul
  categoryEspecializacion: '#8b5cf6', // morado
  
  // Modality badges
  modalityPresencial: '#f97316', // naranja
  modalityVirtual: '#06b6d4', // cyan
  modalitySemipresencial: '#eab308', // amarillo
} as const;

export type ColorKey = keyof typeof COLORS;
