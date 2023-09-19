const video = document.getElementById('input');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');

// ビデオ再生用のビデオ要素
const gestureVideo = document.getElementById('gestureVideo');
const playButton = document.getElementById('playButton');

// Add CSS styles to hide the camera feed elements
video.style.display = 'none'; // Hide the camera video element
canvas.style.display = 'none'; // Hide the canvas element
let isVideoPlaying = false; // Define isVideoPlaying in a global scope

// ランダムなビデオファイルのリスト（ファイルパスを追加してください）
const videoFiles = [
    'MacBoocAir テレビCM 「日本」 [uEecmbmfEs0].mp4',
    'The new iBook CM(2001) [INBRjpPH9J8].mp4',
    '【CM】アップル MacBookAir Stickers [sm24062637].mp4',
    '【幻CM】もしもMacBook Proが1980年代に発売されていたら [g7_hOoWX12c].mp4',
    '新しいMacBook Air ｜ M2の驚異的なパワー、内蔵 ｜ Apple [_fnxvf7v2xQ].mp4',
    'iBook ＂iMac To Go＂ Commercial [ZWA4-CAUUBw].mp4',
    'apple.mp4',
    // 他のビデオファイルを追加
  ];

function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videoFiles.length);
    return videoFiles[randomIndex];
  }
  // playButton.addEventListener('click', () => {
  // ビデオの読み込みが完了した時に呼ばれるコールバック

  gestureVideo.onloadedmetadata = () => { // Changed 'gestureVideos' to 'gestureVideo'
    // ビデオを再生
    gestureVideo.play();
   };





// });



  // ピースサインを検出した時に呼ばれるコールバック
  function handlePeaceSignDetection() {
    const randomVideoFile = getRandomVideo();
    const videoFileNameWithoutExtension = randomVideoFile.replace('.mp4', ''); // Remove ".mp4"
    gestureVideo.src = randomVideoFile; // ランダムなビデオを設定
    gestureVideo.load(); // ビデオを読み込む
     // 再生中のビデオファイル名を表示
     
    // Show the video element
  gestureVideo.style.display = 'block';
     
  
    const currentVideoFileName = document.getElementById('currentVideoFileName');
     currentVideoFileName.textContent = `再生中のビデオ: ${videoFileNameWithoutExtension}`;
  }
  
    
    
    
  
 
  
  
  
    // ピースサインを検出した時に呼ばれるコールバック
    function PeaceSignSeleciton(a) {
    
    const SelectionVideoFile = videoFiles[a];
    const videoS = SelectionVideoFile.replace('.mp4', ''); // Remove ".mp4"
      gestureVideo.src = SelectionVideoFile; // ランダムなビデオを設定
      gestureVideo.load(); // ビデオを読み込む
      
      
     // Show the video element
  gestureVideo.style.display = 'block';
     // 再生中のビデオファイル名を表示
     const currentVideoFileName = document.getElementById('currentVideoFileName');
     currentVideoFileName.textContent = `再生中のビデオ: ${videoS}`;
      
    }
      
    
  
    function PSD() {
      if (isVideoPlaying) {
        gestureVideo.pause(); // If the video was playing, pause it
        isVideoPlaying = false;
      } else {
        // If the video was paused, resume it
        gestureVideo.play();
        isVideoPlaying = true;
      }
    }

    
  
  // アニメーションを実行する文字列
  const textToAnimate = "currentVideoFileName.textContent";

  // 表示する要素を取得
  const textElement = document.getElementById("textAnimation");

  // アニメーションの速度（ミリ秒単位）
  const animationSpeed = 100;

  let currentIndex = 0;

  function animateText() {
      if (currentIndex < textToAnimate.length) {
          textElement.textContent += textToAnimate.charAt(currentIndex);
          currentIndex++;
          setTimeout(animateText, animationSpeed);
      }
  }
  
  
//関連ファイルの読み込み
const config = {
  locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
};
const hands = new Hands(config);

//カメラからの映像をhands.jsで使えるようにする
const camera = new Camera(video, {
  onFrame: async () => {
    await hands.send({image: video});
  },
  width: 600,
  height: 400
});

hands.setOptions({
    maxNumHands: 2,              //検出する手の最大数
    modelComplexity: 1,          //ランドマーク検出精度(0か1)
    minDetectionConfidence: 0.5, //手を検出するための信頼値(0.0~1.0)
    minTrackingConfidence: 0.5   //ランドマーク追跡の信頼度(0.0~1.0)
});





//形状認識した結果の取得
hands.onResults(results => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(results.image,0,0,canvas.width,canvas.height);
  
  if(results.multiHandLandmarks) {
    results.multiHandLandmarks.forEach(marks => {
        // 各指の末端のランドマークを取得
        const fingerTips = [marks[4], marks[8], marks[12], marks[16], marks[20]];
  
        // 指の数をカウント
        let fingerCount = 0;
        for (let i = 0; i < fingerTips.length; i++) {
          // 画面の下半分に指がある場合にカウント
          if (fingerTips[i].y * canvas.height < canvas.height / 2) {
            fingerCount++;
          }
        }
  
        console.log(`検出された指の数: ${fingerCount}`);
        // ピースサインを検出する条件をチェック
      const OneSign = fingerCount === 1; // 1本の指を曲げた状態をピースサインとみなす 
      const isPeaceSign = fingerCount === 2; // 2本の指を曲げた状態をピースサインとみなす
      const isTreeSign = fingerCount === 3; // 3本の指を曲げた状態をピースサインとみなす
      const isForSign = fingerCount === 4; // 4本の指を曲げた状態をピースサインとみなす
      const isPaperSign = fingerCount === 5; // 5本の指を曲げた状態をピースサインとみなす
      const isCrash  = fingerCount === 0; 
      const nonCrash = fingerCount !== 02345;

        if (isPeaceSign) {
            // gestureVideo.play(); // ピースサインを認識したらビデオ再生
            PeaceSignSeleciton(6)
     } else if (isTreeSign){
        handlePeaceSignDetection()

      } else if (isForSign) {
        PSD()

      
      } else if (isCrash) {
        gestureVideo.style.display = 'none';

    
          
          currentVideoFileName.textContent = `説明`;
      // アニメーションを開始
      animateText();
   
      } else if (OneSign && nonCrash)  {
        // Show the video element
        gestureVideo.style.display = 'none';

    
          
          currentVideoFileName.textContent = `再生中のビデオ: 停止中`;
          gestureVideo.pause(); // ピースサインを認識しない場合はビデオ停止
          
         
        }
        // 指の数を div 要素に表示
      const fingerCountDisplay = document.getElementById('fingerCountDisplay');
      fingerCountDisplay.textContent = `検出された指の数: ${fingerCount}`;
     

    });

    
    results.multiHandLandmarks.forEach(marks => {
      // 緑色の線で骨組みを可視化
      drawConnectors(ctx, marks, HAND_CONNECTIONS, {color: '#0f0'});

      // 赤色でランドマークを可視化
      drawLandmarks(ctx, marks, {color: '#f00'});

      
    })
  }
});


camera.start()




