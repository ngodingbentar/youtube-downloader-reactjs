import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function HomeScreen() {
  const [loadingResi, setLoadingResi] = useState(true);
  const [formats, setFormats] = useState([]);
  const [myData, setMyData] = useState([]);
  const [videoYt, setVideoYt] = useState('');
  
  const baseUrl = `http://localhost:5000/api/v1/`

  const submit = async () => {
    setLoadingResi(true)
    try{
      const url = `${baseUrl}videoInfo?videoURL=${videoYt}`
      const result = await Axios.get(url)
      console.log('result', result.data)
      setMyData(result.data)
      setFormats(result.data.formats)
      if(result.data){
        setLoadingResi(false)
      }
    } catch(err){
      console.log(err)
    }
    
  };

  const download = async (item) => {
    const url = `${baseUrl}download?videoURL=${videoYt}&itag=${item.itag}`
    window.open(url)
  }

  return (
    <div>
      <div>
        <input onChange={(e) => setVideoYt(e.target.value)} />
        <button onClick={submit}>Submit</button>
      </div>
      <div>
      <section>
        {formats.map((item, index) => (
          <div key={index}>
            {((item.qualityLabel !== null) && item.audioCodec) && (
              <div onClick={()=>download(item)}>
                <p><b>{item.qualityLabel}</b></p>
              </div>
            ) }
          </div>
        ))}
      </section>
      <section>
        {formats.map((item, index) => (
          <div key={index}>
            {((item.qualityLabel !== null) && !item.audioCodec) && (
              <div onClick={()=>download(item)}>
                <p><b>{item.qualityLabel}</b> noSound</p>
              </div>
            )}
          </div>
        ))}
      </section>
      </div>
      <button onClick={()=> console.log(myData)}>cek</button>
    </div>
  )
}
