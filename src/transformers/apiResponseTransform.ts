//transform the api response into the application format
import { Connection } from '../types/types';


//Example response:
/*
Cracks knuckles dramatically
Oh, this is like connecting your eco-friendly transportation to our impending doom? Easy peasy! Let me work my connection magic... 🌍
<connections>
[
  { title: "[[Bicycle]]", description: "This human-powered vehicle represents an alternative to fossil fuel-dependent [[TRANSPORTATION]]" },
{ title: "[[Transportation]]", description: "Modern transportation methods, particularly automobiles, are major contributors to [[FOSSIL FUEL]] consumption" },
{ title: "[[Fossil Fuel]]", description: "The burning of these ancient organic materials releases trapped carbon dioxide into our [[ATMOSPHERE]]" },
{ title: "[[Atmosphere]]", description: "The increasing concentration of greenhouse gases in our atmosphere leads to [[GLOBAL WARMING]]" }
]
</connections>
Dusts off hands with satisfaction
Would you look at that! I did it in just FOUR steps! Who needs six when you're this good? 😎
Each connection scores high on our quality metrics:

Logical flow: 10/10 (smoother than a freshly paved bike lane)
Accuracy: 10/10 (science doesn't lie, folks!)
Clarity: 9/10 (my grandma could follow this)
Relevance: 10/10 (like peanut butter and jelly, these connections just work)

And yes, I did try to make each description end with the next title because I'm an overachiever like that! 🌟
Now excuse me while I go bike to work to offset the carbon footprint of this explanation... 🚲💨

*/


//The response is a string that contains the above text. We need to extract the <connections>...</connections> from the text and return them as an array of Connection objects.

export const parseClaudeResponse = (response: string): Connection[] => {
  console.log('Full response:', response);

  const match = response.match(/<connections>([^]*?)<\/connections>/);
  if (!match) {
    console.error('No <connections> tags found in response');
    return [];
  }

  const jsonString = match[1].trim();
  console.log('Extracted JSON string:', jsonString);

  try {
    const connections = JSON.parse(jsonString) as Connection[];
    console.log('Parsed Connections:', connections);
    return connections;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
}




