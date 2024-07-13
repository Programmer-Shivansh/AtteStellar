// // Navbar.js
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css'; // Ensure this path is correct
// import ConnectButton from './ConnectBlockchain'; // Import the ConnectButton component
// import { checkConnection, retrievePublicKey } from './freighter'; // Import your wallet connection check function
// const Navbar = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [publicKey, setPublicKey] = useState('');

//   useEffect(() => {
//     // Check if the wallet is already connected when the component mounts
//     const storedConnectionStatus = localStorage.getItem('walletConnected');
//     if (storedConnectionStatus === 'true') {
//       setIsConnected(true);
//     }
//   }, []);

//   const handleConnect = async () => {
//     try {
//       if (await checkConnection()) {
//         setIsConnected(true);
//         const key = await retrievePublicKey();
//         setPublicKey(key);
//         setModalOpen(true);

//         // Save connection status to localStorage
//         localStorage.setItem('walletConnected', 'true');

//         // Automatically close the modal after 2 seconds
//         setTimeout(() => {
//           setModalOpen(false);
//         }, 2000);
//       }
//     } catch (err) {
//       console.error('Error connecting to wallet:', err.message);
//     }
//   };

//   const handleDisconnect = () => {
//     // Handle wallet disconnection logic here
//     setIsConnected(false);
//     setPublicKey('');
//     setModalOpen(false);
    
//     // Remove connection status from localStorage
//     localStorage.removeItem('walletConnected');
//   };

//   return (
//     <nav className="navbar">
//       <ul className="navbar-menu">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/create-schema">Create Schema</Link></li>
//         <li><Link to="/schema">Schema</Link></li>
//       </ul>
//       {!isConnected ? (
//         <ConnectButton />
//       ) : (
//         <button className="disconnect-button" onClick={handleDisconnect}>
//           Disconnect
//         </button>
//       )}
//       {modalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Wallet Connected</h2>
//             <p>The wallet is connected to {publicKey}</p>
//             <button className="modal-close" onClick={() => setModalOpen(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this path is correct
// import { checkConnection, retrievePublicKey } from './freighter'; // Import your wallet connection check function

const Navbar = () => {
  // const [isConnected, setIsConnected] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [publicKey, setPublicKey] = useState('');

  // useEffect(() => {
  //   // Check if the wallet is already connected when the component mounts
  //   const storedConnectionStatus = localStorage.getItem('walletConnected');
  //   if (storedConnectionStatus === 'true') {
  //     setIsConnected(true);
  //   }
  // }, []);

  // const handleConnect = async () => {
  //   try {
  //     if (await checkConnection()) {
  //       setIsConnected(true);
  //       const key = await retrievePublicKey();
  //       setPublicKey(key);
  //       setModalOpen(true);

  //       // Save connection status to localStorage
  //       localStorage.setItem('walletConnected', 'true');

  //       // Automatically close the modal after 2 seconds
  //       setTimeout(() => {
  //         setModalOpen(false);
  //       }, 2000);
  //     }
  //   } catch (err) {
  //     console.error('Error connecting to wallet:', err.message);
  //   }
  // };

  // const handleDisconnect = () => {
  //   // Handle wallet disconnection logic here
  //   setIsConnected(false);
  //   setPublicKey('');
  //   setModalOpen(false);
    
  //   // Remove connection status from localStorage
  //   localStorage.removeItem('walletConnected');
  // };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create-schema">Create Schema</Link></li>
        <li><Link to="/schema">Schema</Link></li>
      </ul>
      {/* {!isConnected ? (
        <button className="connect-button" onClick={handleConnect}>
          Connect to Wallet
        </button>
      ) : (
        <button className="disconnect-button" onClick={handleDisconnect}>
          Disconnect
        </button>
      )}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Wallet Connected</h2>
            <p>The wallet is connected to {publicKey}</p>
            <button className="modal-close" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
