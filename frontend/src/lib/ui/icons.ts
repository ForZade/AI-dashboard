"use client";

import * as SolarIcons from '@solar-icons/react';

export const iconMap: Record<string, React.ComponentType<SolarIcons.IconProps>> = {
  "home": SolarIcons.Home,
  "chat": SolarIcons.ChatRound,
  "settings": SolarIcons.Settings,
};

export function getIcon(iconName: string) {
  return iconMap[iconName] || SolarIcons.QuestionCircle;
}