import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button, Spinner } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Form, FormGroup, Label, FormText } from 'reactstrap';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [formats, setFormats] = useState([]);
  const [myData, setMyData] = useState([]);
  const [videoYt, setVideoYt] = useState('');
  const [videoIG, setVideoIG] = useState('');
  const [format, setFormat] = useState({});

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [platform, setPlatform] = useState("youtube");

  const toggle = () => setDropdownOpen(prevState => !prevState);

  
  const baseUrl = `/api/v1/`

  const submit = async () => {
    setLoading(true)
    setError(false)
    setIsEmpty(true)
    try{
      if(platform == "instagram"){
        const url = `${baseUrl}ig2?videoURL=${videoYt}`
        const result = await Axios.get(url)
        if(result.data){
          setLoading(false)
          setVideoIG(result.data.downloadLink)
          window.open(result.data.downloadLink)
        }
        
      } else {
        const url = `${baseUrl}videoInfo?videoURL=${videoYt}`
        console.log('url', url)
        const result = await Axios.get(url)
        setMyData(result.data)
        setFormats(result.data.formats)
        if(result.data){
          setLoading(false)
          setIsEmpty(false)
        }
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

  const downIg = async () => {
    const url = 'https://instagram.fsub3-2.fna.fbcdn.net/v/t51.2885-15/e35/190041757_773774123342047_4165319150335122909_n.jpg?tp=1&_nc_ht=instagram.fsub3-2.fna.fbcdn.net&_nc_cat=107&_nc_ohc=1_hXH0NCAr8AX_kDRt9&edm=AABBvjUBAAAA&ccb=7-4&oh=5b743377f6b3bd2bbb9f398dcd986516&oe=60B29542&_nc_sid=83d603'
    window.open(url)
    console.log(url) 
  }

  const thisPlatform = async (item) => {
    console.log(item)
    setPlatform(item)
  }

  return (
    <Container className="mt-16">
      <h3 className="text-center">Online Video Downloader</h3>
      {/* <button onClick={()=>downIg()}>downIg</button> */}
      <p className="text-center"><a href="https://www.instagram.com/ngodingbentar/" target="_blank">@ngodingbentar</a></p>
      <div className="platform">
        <input
          type="radio"
          id="youtube"
          name="platform"
          value="youtube"
          checked={platform === "youtube"}
          onChange={e => thisPlatform(e.currentTarget.value)}
        />
        <label htmlFor="youtube">Youtube</label>
        <input
          type="radio"
          id="instagram"
          name="platform"
          value="instagram"
          checked={platform === "instagram"}
          onChange={e => thisPlatform(e.currentTarget.value)}
        />
        <label htmlFor="instagram">Instagram</label>
      </div>
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
