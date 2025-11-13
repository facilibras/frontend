import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useThemeStore } from '../store/theme';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="rounded-full"
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
}
