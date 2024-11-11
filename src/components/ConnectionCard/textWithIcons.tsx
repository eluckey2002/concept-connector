import React, { useEffect, useRef } from 'react';
import * as Icons from 'react-icons/gi';

interface TextWithIconsProps {
  text: string;
}

type IconName = keyof typeof Icons;

const TextWithIcons: React.FC<TextWithIconsProps> = ({ text }) => {
  const renderTimeRef = useRef<number | null>(null);


  // Rendering logic: replace #icon-name# placeholders with corresponding icons
  const renderTextWithIcons = (inputText: string) => {
    // Regular expression to match #icon-name# patterns
    const regex = /#(.*?)#/g;
    const parts = inputText.split(regex);

    return parts.map((part, index) => {
      // Check if the part is a valid icon name
      if ((Icons as Record<string, React.ComponentType>)[part]) {
        // Create the icon component dynamically
        const IconComponent = Icons[part as IconName];
        return (
          <IconComponent
            key={index}
            style={{ display: 'inline-flex', verticalAlign: 'middle' }}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return <span>{renderTextWithIcons(text)}</span>;
};

export default TextWithIcons;
