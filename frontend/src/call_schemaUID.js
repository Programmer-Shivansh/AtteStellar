export async function viewIPFSData(ipfsHash) {
    const url = (`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
    try{
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch IPFS data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    }catch(error) {
      console.error("Error retrieving data from IPFS:", error);
      throw error;
    }
  }