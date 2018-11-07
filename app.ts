window.onload = () => {
  const boardSize = 800;
  const pSize = 4;
  
  let arr = new Array(boardSize/pSize);             //initialize a 2-dimensional array
    for (var i = 0; i < boardSize/pSize; i++) {
        arr[i] = new Array(boardSize/pSize);
    }
  
  let arrNew = arr.slice();

  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';


  //New boolean Matrix
  for(let i = 0; i < boardSize/pSize; i++){
    for(let j = 0; j < boardSize/pSize; j++){
      if((Math.floor((Math.random()* 33)+1)) == 1 ){       //The chance is about 3 percent that a random number between 1 and 33 equals 1. 
        arr[i][j] = 1;
      }else{
        arr[i][j] = 0;
      }
    }
  }

  // Call 'draw' function whenever browser renders a frame on the screen
  window.requestAnimationFrame(draw);



  function draw() {

    let counter:number = 0;
    
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr[i].length; j++){
        if(arr[i][j] == 1){
          ctx.fillRect(i*pSize, j*pSize, pSize, pSize);
        }
      }
    }
    
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr[i].length; j++){
        for(let k = i-1; k < i+1; k++){           //<= gibt Startpunkte aus
          for(let l = j-1; l < j+1; l++){
            if(k>=0 && l>=0 && k<boardSize && l<boardSize){
              if(arr[k][l] == 1){
                counter++;
              }
            }
          }
        }
        
        if(arr[i][j] == 1){
          counter--;
        }
        
        if(counter == 3){
          arrNew[i][j] = 1;
        }else if(counter == 2){
          
        }else{
          arrNew[i][j]=0;
        }

        counter = 0;
        
      }
    }

    arr = arrNew.slice();
    
    ctx.clearRect(0, 0, boardSize, boardSize);
    

    window.requestAnimationFrame(draw);
  }
};