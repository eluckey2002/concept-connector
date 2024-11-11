//transform the api response into the application format
import { Connection } from '../types/types';


//Example response:
/*
<introductory_commentary>
Oh, this is going to be delicious! I'm creating a new game mode called "Global Gastronomy" where we'll connect foods through their culinary evolution, cultural fusion, and shared ingredients. Let's roll (pun intended) through this tasty journey! #GiCook#
</introductory_commentary>

<connections>
[
  { "title": "Sushi", "description": "This Japanese delicacy traditionally preserves fish with RICE" },
  { "title": "Rice", "description": "Rice cultivation spread along the ancient SILK ROAD" },
  { "title": "Silk Road", "description": "The Silk Road connected Asia to the Mediterranean, including ITALY" },
  { "title": "Italy", "description": "Italy's culinary innovation transformed flatbread into PIZZA" },
  { "title": "Pizza", "description": "Well, would you look at that! We've gone from raw fish rolls to cheesy pies in just 4 steps. That's what I call a global food tour! #GiPizzaSlice#" }
]
</connections>

<completed_commentary>
Bon appétit! We just took a culinary journey across continents, connecting two of the world's most beloved dishes. And we did it in just 4 steps! That's faster than delivery! #ImSpoonFork#
</completed_commentary>
*/
//The response is a string that contains the above text. We need to extract the <connections>...</connections> from the text and return them as an array of Connection objects.

// Function to parse the response from Claude API
export const parseConnectionStatements = (response: string): Connection[] => {
  // Log the full response for debugging
  console.log('Full response:', response);

  // Use regex to match the <connections>...</connections> part of the response
  const match = response.match(/<connections>([^]*?)<\/connections>/);
  if (!match) {
    // If no match is found, log an error and return an empty array
    console.error('No <connections> tags found in response');
    return [];
  }

  // Trim the matched string to remove any leading or trailing whitespace
  const jsonString = match[1].trim();
 

  try {
    // Parse the trimmed string as JSON and cast it to an array of Connection objects
    const connections = JSON.parse(jsonString) as Connection[];
    
    // Return the parsed connections
    return connections;
  } catch (error) {
    // If an error occurs during parsing, log the error and return an empty array
    console.error('Error parsing JSON:', error);
    return [];
  }
}

export const parseIntroductoryCommentary = (response: string): string => {
    // Use regex to match the introductory commentary part of the response
    const match = response.match(/<introductory_commentary>([^]*?)<\/introductory_commentary>/);
    if (!match) {
        console.error('No <introductory_commentary> tags found in response');
        return "";
    }
    console.log('Introductory Commentary:', match[1].trim());
    return match[1].trim();

}   

export const completedCommentary = (response: string): string => {
    const match = response.match(/<completed_commentary>([^]*?)<\/completed_commentary>/);
    if (!match) {
        console.error('No <completed_commentary> tags found in response');
        return "";
    }
    console.log('Completed Commentary:', match[1].trim());
    return match[1].trim();
}

