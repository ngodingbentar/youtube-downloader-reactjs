import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv'
import axios from 'axios'
import cheerio from 'cheerio'
import ytdl from 'ytdl-core'

dotenv.config()

const apiRouter = express.Router();
let thisName = ''

apiRouter.get('/videoInfo',
  expressAsyncHandler(async (req, res) => {
    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    res.status(200).json(info);
  })
)



apiRouter.post('/setname',
  expressAsyncHandler(async (req, res) => {
    thisName = req.body.videoName
    res.send('setname')
  })
)


const getVideo = async url => {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const videoString = $("meta[property='og:video']").attr("content");
  return videoString;
};

apiRouter.get('/ig',
  expressAsyncHandler(async (req, res) => {
    res.send('it works')
  })
)

apiRouter.post('/ig',
  expressAsyncHandler(async (req, res) => {
    try {
      const videoLink = await getVideo(req.body.url);
      if (videoLink !== undefined) {
        res.json({ downloadLink: videoLink });
      } else {
        res.json({ error: "The link you have entered is invalid. " });
      }
    } catch (err) {
      res.json({
        error: "There is a problem with the link you have provided."
      });
    }
  })
)

apiRouter.get('/ig2',
  expressAsyncHandler(async (req, res) => {
    const v = 'https://www.instagram.com/tv/COXYd0Dgk59/?utm_source=ig_web_copy_link'
    const videoURL = req.query.videoURL;

    try {
      const videoLink = await getVideo(videoURL);
      if (videoLink !== undefined) {
        res.json({ downloadLink: videoLink });
      } else {
        res.json({ error: "The link you have entered is invalid. " });
      }
    } catch (err) {
      res.json({
        error: "There is a problem with the link you have provided."
      });
    }

  })
)

apiRouter.get('/download',
  expressAsyncHandler(async (req, res) => {
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    const myname=`${thisName}.mp4`
    res.header("Content-Disposition",`attachment;\ filename=${myname}`);
    ytdl(videoURL,{
      filter: format => format.itag == itag
    }).pipe(res);
  })
)




export default apiRouter;
