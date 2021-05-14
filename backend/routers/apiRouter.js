import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv'
import ytdl from 'ytdl-core'

dotenv.config()

const apiRouter = express.Router();

apiRouter.get('/videoInfo',
  expressAsyncHandler(async (req, res) => {
    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    res.status(200).json(info);
  })
)

apiRouter.get('/download',
  expressAsyncHandler(async (req, res) => {
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    res.header("Content-Disposition",'attachment;\ filename="video.mp4"');
    ytdl(videoURL,{
      filter: format => format.itag == itag
    }).pipe(res);
  })
)


export default apiRouter;
