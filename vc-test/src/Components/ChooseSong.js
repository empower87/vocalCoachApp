import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import SongList from './SongList.js'
import TestAudio from './TestAudio.js'
import token from './Token.js'

 
function ChooseSong(props) {
    let [artist1, setArtist1] = useState()
    let [title1, setTitle1] = useState('pick a song')
    let [albumArt1, setAlbumArt1] = useState()
    let [artist2, setArtist2] = useState()
    let [title2, setTitle2] = useState('pick a song')
    let [albumArt2, setAlbumArt2] = useState()
    let [processSong1,setProcessSong1] = useState();
    let [processSong2,setProcessSong2] = useState();
    let [songId1,setSongId1] = useState();
    let [songId2,setSongId2] = useState();
    let [showTest,setShowTest] = useState();
    let [firstAnalysis,setFirstAnalysis] = useState({})
    let [secondAnalysis,setSecondAnalysis] = useState({})


    useEffect(()=>{
        setShowTest(showTestAudio)
    },[secondAnalysis,firstAnalysis])

    const displayChoice = (x, num) => {
        if (num == 1) {
            setArtist1(x.artists[0].name)
            setTitle1(x.name)
            setAlbumArt1(x.album.images[1].url)
            setProcessSong1(x.preview_url)
            setSongId1(x.id)
        }
        else {
            setArtist2(x.artists[0].name)
            setTitle2(x.name)
            setAlbumArt2(x.album.images[1].url)
            setProcessSong2(x.preview_url)
            console.log('id to be set',x.id)
            setSongId2(x.id)
            setShowTest(()=>musion(x.id))
        }
      }

const musion=(x)=>{
    return(
        <button className="transpose" onClick={()=>getMusicAnalysis(x)}>Muse</button>
    )
}

const showTestAudio = ()=>{
   console.log(processSong1,processSong2,firstAnalysis,secondAnalysis)
    return(<TestAudio 
                        songOne = {processSong1}
                        songTwo = {processSong2}
                        songIdOne={firstAnalysis}
                        songIdTwo={secondAnalysis}
                        />)
}

async function getSpotifyAnalysis(id,num) {
    fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${await token()}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
       console.log(data,id)
       if(num===1){
       setFirstAnalysis({
         bpm: data.track.tempo,
         key: data.track.key
       })
     }else{
       setSecondAnalysis({
         bpm: data.track.tempo,
         key: data.track.key
          })
         }
      });
  }
 

  function getMusicAnalysis(x){
    let useId1 = songId1
    let useId2 = x
    
    getSpotifyAnalysis(useId1,1)
    getSpotifyAnalysis(useId2,2)
    
  }
      
    return (
        <div className="chooseSong">
            <h1>Choose Your Songs</h1>

            <div className="container-choose">
                <SongList num={1}
                    displayChoice = {displayChoice}
                    id = 'song-list-one'
                    selectKey = "Pick Song #1:"
                    />
                <SongList num={2}
                    displayChoice = {displayChoice}
                    id = 'song-list-two'
                    selectKey = "Pick Song #2:"
                    />
            </div>

            <div className="song-choices">
                <div className="choice-one">
                    <img src={albumArt1} alt=''/>
                    <div>
                        <p><b>{artist1}</b></p>
                        <p>{title1}</p>
                    </div>
                </div>
                <div className="transpose-container">
                    {/* <button className="transpose"><b>Transpose</b></button> */}
                    {showTest}
                    <h3>or</h3>
                    <button className="customize-button">Customize</button>
                </div>
                <div className="choice-two">
                    <img src={albumArt2} alt= '' />
                    <div>
                        <p><b>{artist2}</b></p>
                        <p>{title2}</p>
                    </div>
                </div>
            </div>

            <div className="example-container">
                <div className="play-button"
                     onClick={() => {
                        if (document.getElementById('first').paused && document.getElementById('second').paused) {
                            document.getElementById('first').play();
                            document.getElementById('second').play();
                            document.getElementById('play-triangle').setAttribute('class', 'fas fa-pause')
                        }
                        else {
                            document.getElementById('first').pause();
                            document.getElementById('second').pause();
                            document.getElementById('play-triangle').setAttribute('class', 'fas fa-play')
                        }
                        }}>
                    <i className="fas fa-play" id="play-triangle"></i>
                </div>
                <div className="play-button-animation" id="pba-two"></div>
                <div className="song-details">
                </div>
            </div>

        </div>
    );
}

export default ChooseSong;

