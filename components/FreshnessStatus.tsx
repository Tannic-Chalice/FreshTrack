// src/components/FreshnessStatus.tsx

import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// Define types for the freshness status and inventory
interface Inventory {
  [key: string]: number;
}

interface FreshnessStatusData {
  freshness: string;
  inventory: Inventory;
}

// Connect to the backend server
const socket: Socket = io('http://127.0.0.1:5000');

const FreshnessStatus: React.FC = () => {
  const [freshness, setFreshness] = useState<string | null>(null);  // freshness could be "fresh" or "rotten"
  const [inventory, setInventory] = useState<Inventory>({});

  useEffect(() => {
    // Listen for freshness status updates from the backend
    socket.on('freshness-status', (data: FreshnessStatusData) => {
      console.log('Received freshness data:', data);
      setFreshness(data.freshness);
      setInventory(data.inventory);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.off('freshness-status');
    };
  }, []);

  return (
    <div>
      <h2>Freshness Status</h2>
      {freshness ? (
        <div>
          <p>{freshness}</p>
          {freshness === 'fresh' ? (
            <div style={{ color: 'green' }}>
              <p>Fresh</p>
            </div>
          ) : (
            <div style={{ color: 'red' }}>
              <p>Not Fresh (Disposed)</p>
            </div>
          )}
        </div>
      ) : (
        <p>Waiting for freshness data...</p>
      )}

      <h3>Inventory</h3>
      <ul>
        {Object.entries(inventory).map(([item, count]) => (
          <li key={item}>
            {item}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreshnessStatus;
