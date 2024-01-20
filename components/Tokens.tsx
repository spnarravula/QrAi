
import { useEffect, useState } from 'react';
 // Update the path

interface TokenProps {
  initialCount: number;
  email: string 
}

const Tokens: React.FC<TokenProps> = ({ initialCount,email }) => {
  const [tokenCount, setTokenCount] = useState(initialCount);


  
  useEffect(() => {
    const fetchTokenCount = async () => {
        
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('Content-Type', 'application/json');
      requestHeaders.set('email',email)

        const token = await fetch('/api/token', {
            method: 'GET',
            headers: requestHeaders,
          });
          const response= await token.json();
          const tokentokens=response.tokens;
        
        if (response) {
          setTokenCount(tokentokens);
        }
      };
  
      fetchTokenCount();
  }, []);

  return (
    <div>
      <h1>Number of Tokens Available: {tokenCount}</h1>
    </div>
  );
};



export default Tokens;
