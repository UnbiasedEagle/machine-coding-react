import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination';

export const Post = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(7);

  useEffect(() => {
    axios
      .get(`https://picsum.photos/v2/list?page=${pageNo}&limit=5`)
      .then((res) => {
        setData(res.data);
      });
  }, [pageNo]);

  return (
    <div className='container'>
      <div className='post-container'>
        {data.map((item) => {
          return <img src={item.download_url} />;
        })}
      </div>
      <Pagination pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  );
};
