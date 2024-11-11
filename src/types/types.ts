// Define the Connection type separately for reusability
export interface Connection {
  title: string;
  description: string;
}

export type ClaudeResponse = Connection[];

export type GameMode = 'Direct' | 'Historical' | 'Scientific' | 'Cultural' | 'Philosophical' | 'Metaphorical' | 'Technical' | 'Creative' | 'Educational' | 'AI Choice'; // Add GameMode type


  /*
  const sampleConnections = [
    { title: "Coffee", description: "A caffeinated beverage made from roasted coffee beans" },
    { title: "Brain Chemistry", description: "The complex interaction of neurotransmitters in the brain" },
    { title: "DNA", description: "The molecule carrying genetic instructions for development" },
    { title: "Natural Selection", description: "The mechanism of evolutionary adaptation" },
    { title: "Biodiversity", description: "The variety of life forms in an ecosystem" },
    { title: "Amazon Rainforest", description: "The world's largest tropical rainforest ecosystem" }
  ];

  */

  //
