import React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={handleToggle}
      />
      <Moon className="h-4 w-4" />
    </div>
  );
};

export default ThemeToggle;