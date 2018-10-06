export const times = Object.freeze({
  BEFORE_6PM: 'Before 6pm',
  AFTER_6PM: 'After 6pm'
});

export function isBefore6p(time){
  const date = new Date(time);
  const hour = date.getUTCHours();
  return hour < 18;
}

export function isAfter6p(time){
  const date = new Date(time);
  const hour = date.getUTCHours();
  return hour >= 18;
}