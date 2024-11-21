export const handleControls = (keys: Record<string, boolean>) => {
  return {
    up: keys['ArrowUp'],
    down: keys['ArrowDown'],
    left: keys['ArrowLeft'],
    right: keys['ArrowRight'],
  };
};
