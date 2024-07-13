export async function uploadJSONToPinata(jsonData) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const headers = {
    "Content-Type": "application/json",
    pinata_api_key: "2beb59cb7381843fcbf8",
    pinata_secret_api_key:
      "b7119f5b469bd15168973cd01fab7f0e5d4d2bd091b1a6402c6a26d5f9876041",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(jsonData),
  });

  if (!response.ok) {
    throw new Error(`IPFS pinning error: ${response.statusText}`);
  }

  return response.json();
}
