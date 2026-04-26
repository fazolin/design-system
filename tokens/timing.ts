export const time = {
    instant: 0,
    flash:   80,
    fast:    120,
    slow:    200,
} as const;

export const easing = {
    linear: 'linear',
    step2:  'steps(2, end)',
    step4:  'steps(4, end)',
    step8:  'steps(8, end)',
} as const;

export type TimeToken = keyof typeof time;
export type EasingToken = keyof typeof easing;
