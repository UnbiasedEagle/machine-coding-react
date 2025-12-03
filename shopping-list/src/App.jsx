import { useEffect, useState } from 'react';

const App = () => {
  const [food, setFood] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [bucket, setBucket] = useState([]);

  useEffect(() => {
    if (food.length <= 2) {
      return;
    }
    const fetchItems = async () => {
      const url = `https://api.frontendeval.com/fake/food/${food}`;
      try {
        const result = await fetch(url);
        if (result.status === 200) {
          const data = await result?.json();
          setShoppingList(data);
        }
      } catch (err) {
        console.error('Error: ', err);
      }
    };
    const timer = setTimeout(() => {
      fetchItems();
    }, 500);

    return () => clearTimeout(timer);
  }, [food]);

  const handleShoppingListClick = (e) => {
    const id = e.target.dataset.id;
    if (id) {
      const obj = {
        id: Date.now(),
        name: shoppingList[id],
        isDone: false,
      };
      setBucket((prev) => [...prev, obj]);
    }
    setFood('');
  };

  const handleBucketClick = (e) => {
    const id = e.target.dataset.id;
    if (id) {
      const type = id.split(':')[0];
      const itemId = id.split(':')[1];
      if (type === 'update') {
        setBucket((prev) =>
          prev.map((item) =>
            item.id === Number(itemId)
              ? { ...item, isDone: !item.isDone }
              : item
          )
        );
      } else if (type === 'delete') {
        setBucket((prev) => prev.filter((item) => item.id !== Number(itemId)));
      }
    }
  };

  return (
    <div className='App'>
      <h1>My Shopping List</h1>
      <div>
        <input
          value={food}
          onChange={(e) => setFood(e.target.value)}
          type='text'
        />
      </div>
      {food.length >= 2 && (
        <div onClick={handleShoppingListClick} className='shopping-list'>
          {shoppingList.map((item, index) => (
            <div data-id={index} className='product' key={item}>
              {item}
            </div>
          ))}
        </div>
      )}
      <div onClick={handleBucketClick} className='bucket'>
        {bucket.map((item) => (
          <div key={item.id} className='shopping-item'>
            <button data-id={`update:${item.id}`}>✓</button>
            <div className={item.isDone ? 'strik' : ''}>{item.name}</div>
            <button data-id={`delete:${item.id}`}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
