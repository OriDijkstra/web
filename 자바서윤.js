saveminNode = {};
//const distances = [];
/*for(let i = 0; i < 10; i++){
    distances[i] = [];
    for(let j = 0; j < 10; i++){
        distances[i][j] = 999;
    }
}*/

//---------------각 노드 번호에 해당하는 좌표 반환하는 함수(시작)---------------
function convertNodeToCoordinates(nodeNumber) {     
  const nodeCoordinates = {
        1: { x: 1, y: 2 },
        2: { x: 4, y: 11 },
        3: { x: 6, y: 15 },
        4: { x: 9, y: 5 },
        5: { x: 13, y: 8 },
        6: { x: 16, y: 1 },
        7: { x: 19, y: 14 },
        8: { x: 23, y: 11 },
        9: { x: 26, y: 5 },
        10: { x: 32, y: 16 }
  };

    return nodeCoordinates[nodeNumber];  
} 
//------------------노드 번호에 해당하는 좌표 반환하는 함수(끝)-------------------
//------------------------다익스트라 함수(시작)------------------------------
function dijkstra(start, end) {  //다익스트라 함수(시작)
  const distances = {};
  const visited = {};
  const path = {};
  //const saveminNode = {};
  // graph 초기화
  const graph = {
        // 각 노드마다 가중치값 설정
        "1": { "1": 0, "2": 11,"3": 999,"4": 10,"5": 999,"6":999,"7":29,"8":999,"9":999,"10":999},
        "2": { "1": 999, "2": 0,"3": 5,"4": 10,"5": 15,"6":999,"7":999,"8":999,"9":999,"10":999},
        "3": { "1": 999, "2": 999,"3": 0,"4": 12,"5":999,"6":999,"7":15,"8":20,"9":999,"10":999},
        "4": { "1": 999, "2": 999,"3": 999,"4": 0,"5": 6,"6":10,"7":999,"8":999,"9":999,"10":999},
        "5": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 0,"6":9,"7":11,"8":999,"9":15,"10":999},
        "6": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":0,"7":23,"8":16,"9":13,"10":999},
        "7": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":0,"8":12,"9":15,"10":14},
        "8": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":999,"8":0,"9":18,"10":999},
        "9": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":999,"8":999,"9":0,"10":16},
        "10": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":999,"8":999,"9":999,"10":0}
        
    };

  // 초기화 단계 (node에는 "1","2","3",... 이 들어감)
  for (let node in graph) {
    distances[node] = 999;
    //distances 2차원 배열 999로 초기화
    visited[node] = false;
    path[node] = null;
  }

  distances[start] = 0; //시작노드에서 시작노드까지의 거리를 0으로 설정

  let i = 0;

  // 최단 경로 탐색
  while (true) {
      let minNode = null;  // minNode = 방문하지 않은 노드 중 최단 경로 길이가 가장 짧은 노드 

      //minnode 찾는 부분
      for (let node in distances) {  
          if (!visited[node] && (minNode === null || distances[node] < distances[minNode])) { 
              minNode = node;  
            
          }
      }
      

      if (minNode === null || distances[minNode] === 999) {
          break; 
      }

      visited[minNode] = true;  // minnode를 방문한 것으로 표시
      saveminNode[i] = minNode;
      console.log(saveminNode); // 방문노드 출력

      // minnode의 이웃노드들에 대해 최단경로 업데이트
      // 강의안의 Dist[w]=min{Dist[w],Dist[u]+weight[u,w]} 부분
      // w = neighbor,u = minNode
      for (let neighbor in graph[minNode]) {  
        
        let newdistance = distances[minNode] + graph[minNode][neighbor];
          //graph[minNode][neighbor] = minNode와 neighbor사이의 거리
          //강의 안의 Dist[u]+weight[u,w] 부분
        
          if (newdistance < distances[neighbor]) { 
            distances[neighbor] = newdistance;  // Dist[w] = newdistance
            path[neighbor] = minNode;  // path = neighbor노드의 이전노드를 나타냄
            // neighbor노드까지 최단 경로찾으면 이 노드의 직전 노드가 minNode, 이를 통해 end까지 역추적
          } //최솟값 찾기
          
        console.log(`${distances[neighbor]} = min{${distances[neighbor]}, ${distances[minNode]} + ${graph[minNode][neighbor]}}`);  // 각 인접노드와의 
          
      } //for문(끝)
    
    if(minNode === end)
      break;

    i++;
  }  //while문(끝)

  // 최단 경로 구성
      if (distances[end] === 999) { // 시작노드부터 도착노드까지 거리가 999이면 (즉,경로가 없으면) 
          return null; // 경로가 없음
      }

      const shortestPath = []; // 최단경로 저장
      let currentNode = end; // 현재노드를 도착노드로 설정, 변수를 따라가면서 역으로 이동

      while (currentNode !== null) {  // 현재노드가 널이 아닐때까지 반복(널은 시작노드에서 더이상 이동할 수 없는경우)
          shortestPath.unshift(currentNode); //현재 노드를 shortestpath 배열 맨 앞에 추가 

          currentNode = path[currentNode];  // 현재노드의 이전노드를 찾아 이전노드가 다시 현재노드가 되어 다음 반복에서 이전 노드를 찾아가면서 최단경
      }

      return shortestPath;
  }   
//-------------------------다익스트라 함수(끝)--------------------------------

//-----------------------가중치 뽑는 다익스트라 함수(시작)------------------------
function dijkstra_weight(start,end) {
  const distances = {};
  const visited = {};
  const path = {};
  const minNodeDistances = [];  
  //for(let i = 0; i < 10; i++){
   // const cells = [];
    //for(let j = 0; j < 10; j++){
      //  distances.push;
    //}
  //}
  //const saveminNode = {};

  // graph 초기화
  const graph = {
        // 각 노드마다 가중치값 설정
        "1": { "1": 0, "2": 11,"3": 999,"4": 10,"5": 999,"6":999,"7":29,"8":999,"9":999,"10":999},
        "2": { "1": 999, "2": 0,"3": 5,"4": 10,"5": 15,"6":999,"7":999,"8":999,"9":999,"10":999},
        "3": { "1": 999, "2": 999,"3": 0,"4": 12,"5":999,"6":999,"7":15,"8":20,"9":999,"10":999},
        "4": { "1": 999, "2": 999,"3": 999,"4": 0,"5": 6,"6":10,"7":999,"8":999,"9":999,"10":999},
        "5": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 0,"6":9,"7":11,"8":999,"9":15,"10":999},
        "6": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":0,"7":23,"8":16,"9":13,"10":999},
        "7": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":0,"8":12,"9":15,"10":14},
        "8": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":999,"8":0,"9":18,"10":999},
        "9": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":999,"8":999,"9":0,"10":16},
        "10": { "1": 999, "2": 999,"3": 999,"4": 999,"5": 999,"6":999,"7":999,"8":999,"9":999,"10":0}
        
    };

  // 초기화 단계 (node에는 "1","2","3",... 이 들어감)
  for (let node in graph) {
    distances[node] = 999;
    //distances 2차원 배열 999로 초기화
    visited[node] = false;
    path[node] = null;
  }

  distances[start] = 0; //시작노드에서 시작노드까지의 거리를 0으로 설정

  // 최단 경로 탐색
  while (true) {
      let minNode = null;  // minNode = 방문하지 않은 노드 중 최단 경로 길이가 가장 짧은 노드 

      //minnode 찾는 부분
      for (let node in distances) {  
          if (!visited[node] && (minNode === null || distances[node] < distances[minNode])) { 
              minNode = node;  
            
          }
      }
      

      if (minNode === null || distances[minNode] === 999) {
          break; 
      }

      visited[minNode] = true;  // minnode를 방문한 것으로 표시
    


      // minnode의 이웃노드들에 대해 최단경로 업데이트
      // 강의안의 Dist[w]=min{Dist[w],Dist[u]+weight[u,w]} 부분
      // w = neighbor,u = minNode
      for (let neighbor in graph[minNode]) {  
        
        let newdistance = distances[minNode] + graph[minNode][neighbor];
          //graph[minNode][neighbor] = minNode와 neighbor사이의 거리
          //강의 안의 Dist[u]+weight[u,w] 부분
        
          if (newdistance < distances[neighbor]) { 
            distances[neighbor] = newdistance;  // Dist[w] = newdistance
            path[neighbor] = minNode;  // path = neighbor노드의 이전노드를 나타냄
            // neighbor노드까지 최단 경로찾으면 이 노드의 직전 노드가 minNode, 이를 통해 end까지 역추적
          } //최솟값 찾기
        
          minNodeDistances.push(distances[neighbor]);
        //return distances[neighbor];

        //console.log(`${distances[neighbor]} = min{${distances[neighbor]}, ${distances[minNode]} + ${graph[minNode][neighbor]}}`);  // 각 인접노드와
          
      } 
   if(minNode === end)
      break;

  }

  return minNodeDistances;
}
//-----------------------가중치 뽑는 다익스트라 함수(끝)------------------------


  // 시작노드,도착노드 입력
  /*startNodeNumber = prompt('시작 노드 번호를 입력하세요 (1~10):');
  destNodeNumber = prompt('도착 노드 번호를 입력하세요 (1~10):');

  // 사용자 입력에 따른 노드 번호로 좌표를 가져옴
  const startNodeCoordinates = convertNodeToCoordinates(Number(startNodeNumber)); 
  const destNodeCoordinates = convertNodeToCoordinates(Number(destNodeNumber));  

  if (!startNodeCoordinates || !destNodeCoordinates) {
      alert('잘못된 노드 번호가 입력되었습니다.');
  } 
  else {
    
    const result = dijkstra(startNodeNumber,destNodeNumber);
   
    console.log(result) // 최단경로 결과 출력

    if (result === null) {
        alert('경로가 없습니다.');
    } 
    else {
        alert('최단 경로: ' + result.join(' -> '));
    }
   
  }   */

  function calculatePath() {
    const startNodeNumber = document.getElementById('nInput').value;
    const destNodeNumber = document.getElementById('mInput').value;

    const startNodeCoordinates = convertNodeToCoordinates(Number(startNodeNumber)); 
    const destNodeCoordinates = convertNodeToCoordinates(Number(destNodeNumber));

    if (!startNodeCoordinates || !destNodeCoordinates) {
        document.getElementById('result').innerText = '잘못된 노드 번호가 입력되었습니다.';
    } 
    else {
        const result = dijkstra(startNodeNumber, destNodeNumber);
        if (result === null) {
            document.getElementById('result').innerText = '경로가 없습니다.';
        } 
        else {
            document.getElementById('result').innerText = '최단 경로: ' + result.join(' -> ');
        }
    }
}


var callCount = 1; //함수가 호출된 횟수 = 표에서의 실행횟수
var intervalId; // setInterval 함수의 반환 값 저장 (멈춤 버튼을 눌렀을 때 clearInterval을 호출하기 위함)
var weight = [];
var p = 1;
var j = 0;

function updateTable() {

  const currentcallCount = callCount;

  document.getElementById('cell1_1').innerText = '초기화';
  //document.getElementById('cell2_1').innerText = Math.floor(Math.random() * 100);
  document.getElementById('cell3_1').innerText = `[${startNodeNumber}]`;

  weight = dijkstra_weight(startNodeNumber,destNodeNumber);
 

  for (let i = 0; i < 10; i++){
        document.getElementById(`cell${i+4}_1`).innerText = `${weight[i]}`;  // 첫번째줄 가중치 채우는 곳
    }
  
  // 새로운 행을 생성
  var newRow = document.createElement('tr'); //var형 변수, 객체 생성
  
  //첫번째 '초기화' 열에 1,2,3... 이 들어가는 부분
  var newCell = document.createElement('td'); 
  newCell.innerText = callCount; //callcount = 1,2,3,...
  newRow.appendChild(newCell);

  //두번째 '선택된 정점' 열에 둘어가는 부분
  var newCell = document.createElement('td'); 
  newCell.innerText = `[${saveminNode[currentcallCount]}]`;
  newRow.appendChild(newCell);

  //세번쨰 'S=true인 정정' 열에 들어가는 부분
  var newCell = document.createElement('td'); 
  for(let i = 0; i < callCount;i++){
    if(i == 0)
        newCell.innerText = `[${saveminNode[i]}],[${saveminNode[i+1]}]`;
    else
        newCell.innerText += `,[${saveminNode[i+1]}]`;
  }
  newRow.appendChild(newCell);

 
  // 각 열의 값을 랜덤하게 업데이트하고 새로운 행에 추가
  for (var i = 1; i <= 10; i++) {
    
    var newCell = document.createElement('td'); //var형 변수, 객체 생성
    newCell.innerText = `${weight[i+j+(9*p)]}`; //innerText에 숫자 넣기
    newRow.appendChild(newCell);  //객체 넣기
    
  }
  j++;
  p++;
  
    // 기존의 tbody에 새로운 행을 추가
  document.querySelector('#dynamicTable tbody').appendChild(newRow);
  callCount++;

  if(saveminNode[currentcallCount] == destNodeNumber){
    clearInterval(intervalId);
    return;
  }
 
  
}

// 페이지 로드 시 자동으로 시작
document.addEventListener('DOMContentLoaded', function() {
  intervalId = setInterval(updateTable, 1000);
});

// "시작" 버튼 클릭 시 함수를 1초마다 호출
document.getElementById('startButton').addEventListener('click', function() {
  intervalId = setInterval(updateTable, 1000);
});

// "멈춤" 버튼 클릭 시 함수 호출 멈춤
document.getElementById('stopButton').addEventListener('click', function() {
  clearInterval(intervalId);
});