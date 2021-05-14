import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Spinner } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [formats, setFormats] = useState([]);
  const [myData, setMyData] = useState([]);
  const [videoYt, setVideoYt] = useState('');
  const [format, setFormat] = useState({});
  
  const baseUrl = `http://localhost:5000/api/v1/`

  const submit = async () => {
    setLoading(true)
    setError(false)
    setIsEmpty(true)
    try{
      const url = `${baseUrl}videoInfo?videoURL=${videoYt}`
      const result = await Axios.get(url)
      // console.log('result', result.data)
      setMyData(result.data)
      setFormats(result.data.formats)
      if(result.data){
        setLoading(false)
        setIsEmpty(false)
      }
    } catch(err){
      console.log(err)
      setError(true)
    }
    
  };

  const download = async (item) => {
    const videoName = myData.videoDetails.title
    try{
      const myurl = `${baseUrl}setname`
      const result = await Axios.post(myurl, {videoName})
      // console.log('res', result)
      if(result.data === "setname"){
        const url = `${baseUrl}download?videoURL=${videoYt}&itag=${item.itag}`
        window.open(url)
        // window.open(url, "", "width=200,height=100");
      }
    }catch(err){
      console.log(err)
    }
    
  }

  const wadudu = async (item) => {
    setVideoYt(item)
    setIsEmpty(true)
  }

  return (
    <Container className="mt-16">
      <h3 className="text-center">Online Video Downloader</h3>
      <p className="text-center"><a href="https://www.instagram.com/ngodingbentar/" target="_blank">@ngodingbentar</a></p>
      <div className="section-search">
        <InputGroup className="search">
          <Input placeholder="Paste your video link here" onChange={(e) => wadudu(e.target.value)} type="search"/>
          <InputGroupAddon addonType="append">
            <Button color="primary" onClick={submit}>Download</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="formats">
        {loading && (
          <div className="text-center">
            <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />{' '}
          </div>
        )}
        {error && (
          <p>Invalid URL</p>
        )}
        {(formats && !loading && !isEmpty) && (
          <section>
            <p className="text-center"><b>{myData.videoDetails.title}</b></p>
            <Row className="format">
              {formats.map((item) => (
                <div key={item.lastModified}>
                  {((item.qualityLabel !== null) && item.audioCodec) && (
                    <div className="dew sound">
                        <Col xs="3" sm="3" md="2" lg="2" >
                          <div className="my-btn" onClick={()=>download(item)}>
                            <p className="myP"><b>{item.qualityLabel}</b></p>
                            <i className="fa fa-volume-up my-icon" ></i>
                          </div>
                        </Col>
                    </div>
                  )}
                </div>
              ))}
            </Row>
            <Row className="format">
              {formats.map((item, index) => (
                <div key={'b'+index}>
                  {((item.qualityLabel !== null) && !item.audioCodec) && (
                    <div className="dew no-sound">
                        <Col xs="3" sm="3" md="2" lg="2">
                          <div className="my-btn" onClick={()=>download(item)}>
                            <p className="myP text-black"><b>{item.qualityLabel}</b></p>
                            <i className="fa fa-volume-off text-danger my-icon" ></i>
                          </div>
                        </Col>
                    </div>
                  )}
                </div>
              ))}
            </Row>
          </section>
        )}
      </div>
      {/* <Button color="danger" onClick={()=> console.log(formats)}>cek</Button> */}
      
    </Container>
  )
}
