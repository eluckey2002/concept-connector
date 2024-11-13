// Define the Connection type separately for reusability
export interface Connection {
  title: string;
  description: string;
}

export interface IntroductoryCommentary {
    commentary: string;
}

export interface CompletedCommentary {
    commentary: string;
}



export type ClaudeResponse = 
 {
    introductoryCommentary: IntroductoryCommentary;
    connections: Connection[];
    completedCommentary: CompletedCommentary;
   
}

export interface APIResponse {
    content: Array<{
      type: string;
      text: string;
    }>;
  }
  
  
export type GameMode = 
    | 'Classic' 
    | 'Academic' 
    | 'Historical' 
    | 'Pop Culture' 
    | 'Invention'
    | 'Geographic' 
    | 'Wordplay' 
    | 'Cause & Effect' 
    | 'Metaphor' 
    | 'Conspiracy Theory'
    | 'AI Choice';




    
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
  export interface AnimationConfig {
    initial: {
      opacity: number;
      y: number;
      scale: number;
    };
    animate: {
      opacity: number;
      y: number;
      scale: number;
    };
    transition: {
      duration: number;
      delay: number;
      ease: string;
    };
  } 