const STORAGE_KEY = '@studio-ghibli';

export function setLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(`${STORAGE_KEY}:${key}`, value);
  } catch (error) {
    console.error('Error setting item in localStorage:', error);
  }
}

export function getLocalStorage(key: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_KEY}:${key}`);
  } catch (error) {
    console.error('Error getting item from localStorage:', error);
    return null;
  }
}