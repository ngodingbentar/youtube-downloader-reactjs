import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Spinner } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [formats, setFormats] = useState([]);
  const [myData, setMyData] = useState([]);
  const [videoYt, setVideoYt] = useState('');
  const [format, setFormat] = useState({});
  
  const baseUrl = `http://localhost:5000/api/v1/`

  const submit = async () => {
    setLoading(true)
    try{
      const url = `${baseUrl}videoInfo?videoURL=${videoYt}`
      const result = await Axios.get(url)
      console.log('result', result.data)
      setMyData(result.data)
      setFormats(result.data.formats)
      if(result.data){
        setLoading(false)
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
    <Container className="mt-16">
      <h3 className="text-center">Online Video Downloader</h3>
      <p className="text-center"><a href="https://www.instagram.com/ngodingbentar/" target="_blank">@ngodingbentar</a></p>
      <div className="section-search">
        <InputGroup className="search">
          <Input placeholder="Paste your video link here" onChange={(e) => setVideoYt(e.target.value)} type="search"/>
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={submit}>Download</Button>
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
      <section>
        {loading && (
          <div className="text-center">
            <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />{' '}
          </div>
        )}
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
      </section>
      </div>
      {/* <Button color="danger" onClick={()=> console.log(format.qualityLabel)}>cek</Button> */}
      
    </Container>
  )
}
