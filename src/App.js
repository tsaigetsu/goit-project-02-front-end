import  { useState } from 'react';
import InProgressModal from './components/InProgressModal/InProgressModal.jsx';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsModalOpen(false); // Закрыть модальное окно после изменения статуса
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <InProgressModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onStatusChange={handleStatusChange} 
      />
      <p>Status: {status}</p>
    </div>
  );
};

export default App;


// function App() {
//   return <h1>Hello, world!</h1>;
// }

// export default App;