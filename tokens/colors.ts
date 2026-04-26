export const colors = {
    void:       '#000000',
    signal:     '#F0F0F0',
    mesh:       '#00FFFF',
    meshDim:    'rgba(0, 255, 255, 0.4)',
    corrupt:    '#FF0033',
    corruptDim: 'rgba(255, 0, 51, 0.5)',
} as const;

export type ColorToken = keyof typeof colors;
