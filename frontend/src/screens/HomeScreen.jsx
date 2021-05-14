import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


export default function HomeScreen() {
  const [loadingResi, setLoadingResi] = useState(true);
  const [formats, setFormats] = useState([]);
  const [myData, setMyData] = useState([]);
  const [videoYt, setVideoYt] = useState('');
  const [format, setFormat] = useState({});
  
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
    <Container>
      <div className="my-4">
        {/* <input onChange={(e) => setVideoYt(e.target.value)} />
        <button onClick={submit}>Submit</button> */}
        <InputGroup>
          <Input placeholder="Paste your video link here" onChange={(e) => setVideoYt(e.target.value)} type="search"/>
          <InputGroupAddon addonType="append">
            <Button onClick={submit}>Download</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="formats">
      <section className="format">
        {formats.map((item, index) => (
          <div key={index}>
            {((item.qualityLabel !== null) && item.audioCodec) && (
              <Button onClick={()=>download(item)}>
                <p><b>{item.qualityLabel}</b> <i className="fa fa-volume-up text-primary"></i></p>
              </Button>
            ) }
          </div>
        ))}
      </section>
      {/* <section className="format">
        {formats.map((item, index) => (
          <div key={index}>
            {((item.qualityLabel !== null) && !item.audioCodec) && (
              <Button onClick={()=>download(item)}>
                <p><b>{item.qualityLabel}</b> <i className="fa fa-volume-off text-danger" ></i></p>
              </Button>
            )}
          </div>
        ))}
      </section> */}
        <Row className="format">
          {formats.map((item, index) => (
            <>
              {((item.qualityLabel !== null) && !item.audioCodec) && (
                <div key={index} className="dew">
                    <Col xs="3" sm="3" md="2" lg="2">
                      <div className="my-btn" onClick={()=>download(item)}>
                        <p className="myP">{item.qualityLabel}</p>
                        <i className="fa fa-volume-off text-danger my-icon" ></i>
                      </div>
                    </Col>
                </div>
              )}
            </>
          ))}
        </Row>
      </div>
      {/* <Button color="danger" onClick={()=> console.log(format.qualityLabel)}>cek</Button> */}
      
    </Container>
  )
}
