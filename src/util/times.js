export const times = Object.freeze({
  BEFORE_6PM: 'Before 6pm',
  AFTER_6PM: 'After 6pm'
});

export function isBefore6p(session){
  const date = new Date(session.time);
  const hour = date.getUTCHours();
  return hour < 18;
}

export function isAfter6p(session){
  const date = new Date(session.time);
  const hour = date.getUTCHours();
  return hour >= 18;
}